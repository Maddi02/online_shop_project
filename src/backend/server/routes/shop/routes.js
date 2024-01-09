const Article = require('../../models/shop/article');
const Category = require('../../models/shop/category');
const Order = require('../../models/shop/order');
const Comment = require('../../models/shop/comment');
const Subcategory = require('../../models/shop/subcategory');
const User = require('../../models/user');
const Rate = require('../../models/shop/rate');
const mongoose = require('mongoose');
const verifyToken = require('../session/verifyToken');
const {Types} = require("mongoose");


module.exports = function (app) {
    app.get('/shop/articles', async function (req, res) {
        try {
            let articles = await Article.find();
            res.status(200).send(articles);
        } catch (error) {
            let errorObj = {body: req.body, errorMessage: "Server error!"};
            res.status(500).send(errorObj);
        }
    });

    app.get('/shop/articles/:categoryId', async function (req, res) {
        try {
            let articles = await Article.find({categoryId: req.params.categoryId});
            res.status(200).send(articles);
        } catch (error) {
            let errorObj = {body: req.body, errorMessage: "Server error!"};
            res.status(500).send(errorObj);
        }
    });


    app.get('/shop/article/:articleId', async function (req, res) {
        try {
            let article = await Article.findById(req.params.articleId);
            res.status(200).send(article);
        } catch (error) {
            let errorObj = {body: req.body, errorMessage: "Server error!"};
            res.status(500).send(errorObj);
        }
    });


    app.get('/shop/categories/', async function (req, res) {
        try {
            let categories = await Category.find();
            res.status(200).send(categories);
        } catch (error) {
            let errorObj = {body: req.body, errorMessage: "Server error!"};
            res.status(500).send(errorObj);
        }
    });

    app.get('/shop/users/', async function (req, res) {
        try {
            let user = await User.find();
            res.status(200).send(user);
        } catch (error) {
            let errorObj = {body: req.body, errorMessage: "Server error!"};
            res.status(500).send(errorObj);
        }
    });


    app.get('/shop/comments/:articleId', async function (req, res) {
        try {
            let comments = await Comment.find({articleId: req.params.articleId});
            res.status(200).send(comments);
        } catch (error) {
            let errorObj = {body: req.body, errorMessage: "Server error!"};
            res.status(500).send(errorObj);
        }
    });

    app.get('/shop/subcategories/', async function (req, res) {
        try {
            let subcategories = await Subcategory.find();
            res.status(200).send(subcategories);
        } catch (error) {
            let errorObj = {body: req.body, errorMessage: "Server error!"};
            res.status(500).send(errorObj);
        }

    });


    app.get('/shop/orders/', verifyToken, async function (req, res) {
        try {
            let orders = await Order.find({userId: req.user.id}).sort({orderNr: 'desc'});
            res.status(200).send(orders);
        } catch (error) {
            let errorObj = {body: req.body, errorMessage: "Server error!"};
            res.status(500).send(errorObj);
        }
    });

    app.get('/shop/rates/:articleId', async function (req, res) {
    try {
        const articleId = req.params.articleId;

        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).send({ message: "Invalid article ID" });
        }

        let rates = await Rate.find({ articleId: articleId });
        res.status(200).send(rates);
    } catch (error) {
        console.error("Error fetching rates:", error);
        let errorObj = { errorMessage: "Server error!" };
        res.status(500).send(errorObj);
    }
});



app.post('/shop/order', async (req, res) => {
    try {
        const { userId, articles, orderNr, orderDate } = req.body;

        const mappedArticles = articles.map(a => {
            if (typeof a.articleId !== 'string' || a.articleId.length !== 24) {
                throw new Error("Invalid article ID");
            }
            return {
                articleId: Types.ObjectId(a.articleId),
                quantity: a.quantity,
                price: a.price
            };
        });

        const newOrder = new Order({
            orderNr,
            articles: mappedArticles,
            userId: Types.ObjectId(userId._id),
            orderDate
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: error.message });
    }
});




    app.post('/shop/comment/', verifyToken, async function (req, res) {
        try {
            let orders = await Order.find({userId: req.user.id}).sort({orderNr: 'desc'});
            let boughtArticle = false;

            loop:
                for (let i = 0; i < orders.length; i++) {
                    for (let j = 0; j < orders[i].articles.length; j++) {
                        if (req.body.articleId == orders[i].articles[j].articleId) {
                            boughtArticle = true;
                            break loop;
                        }
                    }
                }


            if (boughtArticle) {
                let commentData = req.body;
                let comment = new Comment(commentData);
                comment.save(function (err) {
                    if (err) {
                        res.status(422).send("Data are not correct!");
                    } else {
                        res.status(201).send("Comment was successful!");
                    }
                });
            } else {
                res.status(422).send("Article was not bought!");
            }
        } catch (error) {
            let errorObj = {body: req.body, errorMessage: "Server error!"};
            res.status(500).send(errorObj);
        }

    });


app.post('/shop/rate/', verifyToken, async function (req, res) {
    try {
        const { rate, articleId, userId } = req.body;

        let newRate = new Rate({
            rate,
            articleId,
            userId
        });

        await newRate.save();
        const rates = await Rate.find({ articleId: articleId })
        const averageRate = rates.reduce((acc, cur) => acc + cur.rate, 0) / rates.length;
        await Article.findByIdAndUpdate(articleId, { $set: { rating: averageRate }});

        res.status(201).send("Rating was successful!");
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error", error: error.message });
    }
});




    app.post('/shop/category', async (req, res) => {
        try {
            const {name, subcategoryIds} = req.body;
            const convertedIds = subcategoryIds.map(id => Types.ObjectId(id));
            const uniqueIds = [...new Set(convertedIds)];

            const existingCategory = await Category.findOne({
                name,
                subcategoryIds: {$in: uniqueIds}
            });

            if (existingCategory) {
                return res.status(400).send({message: 'A category with the same name and subcategories already exists.'});
            }

            const newCategory = new Category({name, subcategoryIds: uniqueIds});
            await newCategory.save();
            res.status(201).send(newCategory);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    app.post('/shop/subcategory', verifyToken, function (req, res) {
        let categoryData = req.body;

        Subcategory.findOne({name: categoryData.name}, function (err, existingCategory) {
            if (err) {
                res.status(500).send("Server error while checking for duplicates");
            } else if (existingCategory) {
                res.status(409).send("A category with this name already exists");
            } else {
                let category = new Subcategory(categoryData);
                category.save(function (err) {
                    if (err) {
                        res.status(422).send("Data are not correct!");
                    } else {
                        res.status(201).send("Category was successfully added!");
                    }
                });
            }
        });
    });


    app.post('/shop/product', verifyToken, async function (req, res) {
        try {
            let productData = req.body;

            let existingProduct = await Article.findOne({name: productData.name});
            if (existingProduct) {
                return res.status(409).send("A product with this name already exists"); // 409 Conflict
            }

            let product = new Article(productData);
            await product.save();
            res.status(201).send("Product was successfully added!");
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error while processing request");
        }
    });

    app.patch('/shop/article/:articleId/:quantity', verifyToken, async function (req, res) {
        try {
            const articleId = req.params.articleId;
            const {newQuantity} = req.body;

            if (!mongoose.Types.ObjectId.isValid(articleId)) {
                return res.status(400).send({message: "Invalid article ID"});
            }

            const article = await Article.findById(articleId);
            if (!article) {
                return res.status(404).send({message: "Article not found"});
            }

            article.quantity = article.quantity - newQuantity;
            await article.save();

            res.status(200).send({message: "Quantity updated successfully", article});
        } catch (error) {
            console.error("Error updating article quantity:", error);
            res.status(500).send({message: "Server error"});
        }
    });


};