const Article = require('../../models/shop/article');
const Category = require('../../models/shop/category');
const Order = require('../../models/shop/order');
const Comment = require('../../models/shop/comment');
const Subcategory = require('../../models/shop/subcategory');
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


app.post('/shop/order', async (req, res) => {
    try {
        const { userId, articles, orderNr, orderDate } = req.body;
        console.log(userId.userId, "UserId");
        // Check if userId is a string and has a length of 24 characters


        // Map over articles and convert articleId to ObjectId
        const mappedArticles = articles.map(a => {
            if (typeof a.articleId !== 'string' || a.articleId.length !== 24) {
                console.log("Invalid article ID");
              //  throw new Error("Invalid article ID");
            }
            return {
                articleId: Types.ObjectId(a.articleId),
                quantity: a.quantity,
                price: a.price
            };
        });

                if (typeof userId.userId !== 'string' || userId.userId.length !== 24) {
            console.log("Invalid user ID");
            //return res.status(400).send("Invalid user ID");
        }

        // Create a new order
        const newOrder = new Order({
            orderNr,
            articles: mappedArticles,
            userId: Types.ObjectId(userId.userId),
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

                let ratings = await Rate.find({articleId: req.body.articleId});

                let newRating = 0;
                let rated = false;
                for (let i = 0; i < ratings.length; i++) {

                    if (ratings[i].userId == req.user.id) {
                        rated = true;
                        break;
                    }
                    newRating = newRating + rating[i];
                }


                if (!rated) {

                    newRating = newRating + req.body.rate;
                    newRating = newRating / (ratings.length + 1);

                    await Article.findByIdAndUpdate({_id: req.body.articleId}, {"rating": newRating});

                    let rateData = req.body;
                    let rate = new Rate(rateData);
                    rate.save(function (err) {
                        if (err) {
                            res.status(422).send("Data are not correct!");
                        } else {
                            res.status(201).send("Rating was successful!");
                        }
                    });
                } else {
                    res.status(422).send("Article was already rated!");
                }
            } else {
                res.status(422).send("Article was not bought, can not be rated!");
            }

        } catch (error) {
            let errorObj = {body: req.body, errorMessage: "Server error!"};
            res.status(500).send(errorObj);
        }
    });


    app.post('/shop/category', async (req, res) => {
        try {
            const {name, subcategoryIds} = req.body;
            const convertedIds = subcategoryIds.map(id => Types.ObjectId(id));
            const uniqueIds = [...new Set(convertedIds)];

            // Check for existing category with the same name and subcategoryIds
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

        // Replace 'name' with the field you want to check for uniqueness
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

            // Create and save the new product
            let product = new Article(productData);
            await product.save();
            res.status(201).send("Product was successfully added!"); // 201 Created
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error while processing request"); // 500 Internal Server Error
        }
    });


};