const User = require('../../models/user');
const SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
const verifyToken = require("./verifyToken");



function generateToken(res, email, id) {
    const expiration = 604800000;
    const token = jwt.sign({email, id}, process.env.TOKEN_SECRET, {
        expiresIn: '7d',
    });
    return res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true if your using https
        httpOnly: true
    });
}


module.exports = function (app) {


    app.get('/test-cookie', (req, res) => {
        res.cookie('token', 'value', {httpOnly: true, sameSite: 'lax'});
        res.send('Cookie has been set');
    });


    app.post('/signup', async function (req, res) {
        let userData = req.body;
        let user = await User.findOne({email: userData.email});
        if (!user) {
            let pw = SHA256(userData.password);
            userData.password = pw;
            let user = new User(userData);
            user.save(function (err) {
                if (err) {
                    res.status(422).send("data are not correct!");
                } else {
                    generateToken(res, userData.email, user._id);
                    res.status(201).send("successfully signed up!");
                }
            });
        } else {
            res.status(401).send("user already exists");
        }
    });


    app.post('/login', async function (req, res) {
            let userData = req.body;
            let user = await User.findOne({email: userData.email});
            if (user) {

                let pw = SHA256(userData.password);

                if (user.password === pw.toString()) {
                    const token = generateToken(res, userData.email, user._id);

                    // Update the response to include the token
                    res.status(201).json({
                        user: user
                    });
                } else {
                    res.status(401).send("user or password wrong!");
                }

            } else {
                res.status(401).send("user does not exists");
            }
        }
    )
    ;


    app.post('/logout', function (req, res) {
        res.clearCookie('token', {
        secure: false, // set to true if your using https
        httpOnly: true,
         });

        res.status(200).send("logout successful");
    });
};