const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  authorId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Article = mongoose.model("articles", ArticleSchema);
