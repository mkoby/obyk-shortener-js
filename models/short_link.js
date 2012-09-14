var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShortLink = new Schema({
  full_link     : String,
  url_hash      : Buffer,
  short_code    : Buffer,
  created_at    : Date
});

mongoose.model('ShortLink', ShortLink);
