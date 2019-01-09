const express = require("express");
const articles = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Article = require("../models/Articles");
articles.use(cors());

process.env.SECRET_KEY = "secret";

articles.post("/", (req, res) => {
  const today = new Date();
  const articleData = {
    id: req.body._id,
    content: req.body.content,
    authorId: req.body.authorId,
    created: today
  };

  Article.findOne({
    content: req.body.content
  })

    .then(article => {
      Article.create(articleData)
        .then(article => {
          res.json({ status: "new article created" });
        })
        .catch(err => {
          res.send("error:" + err);
        });
    })
    .catch(err => {
      res.send("error:" + err);
    });
});

articles.get("/", (req, res) => {
  Article.find({}, function(err, articles) {
    if (err) {
      res.json({ status: "Error, articles not found..." });
    } else {
      res.send(articles);
    }
  }).sort({ date: -1 });
  console.log;
});

articles.delete("/:id", (req, res) => {
  var id = req.params.id;

  Article.remove({ _id: id })
    .exec()
    .then(result => {
      return res.status(200).json({ message: "Article Deleted" });
    })
    .catch(err => next(err));
});

module.exports = articles;
