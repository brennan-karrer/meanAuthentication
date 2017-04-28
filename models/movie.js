const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  url: String,
  description: String
});

module.exports = mongoose.model('movie', movieSchema, 'movies');
