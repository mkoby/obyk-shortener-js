function make(Schema, mongoos) {
  ShortLinkSchema = new Schema({
    full_link     : String,
    url_hash      : BinData,
    short_code    : BinData,
    created_at    : Date
  });
  mongoose.model('ShortLink', ShortLinkSchema);
}

module.exports.make = make;
