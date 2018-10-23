const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  image: { type: String},
  title: { type: String, required: true},
  summary: { type: String, required: true},
  byline: { type: String, required: true },
  url: { type: String, required: true},
  pub_date: {type: Date, required: true}, 
  saved: { type: Date, default: Date.now }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
