var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShortLinkSchema = new Schema({
  full_link     : String,
  url_hash      : Buffer,
  short_code    : Buffer,
  created_at    : Date
});

ShortLinkSchema.index({ url_hash: 1 });
ShortLinkSchema.index({ short_code: 1 });
mongoose.model('ShortLink', ShortLinkSchema);
