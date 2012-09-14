var mongoose = require('mongoose');
var ShortLink = mongoose.model('ShortLink');
var crypto = require('crypto');
var shasum = crypto.createHash('sha1');

module.exports = function(app, auth){

  app.param('short_code', function(req, res, next, id){
    ShortLink.findOne({ _shortCode : req.params.short_code })
      .run(function(err, shortLink) {
        if(err){ return next(err); }
        if(!shortLink){ return next(new Error('Faild to find the short code ' + short_code)); }
        req.short_link = shortLink;
      });
  });

  app.post('/short_links', function(req, res){ 
    console.log(req);
    var req_full_link = req.body.short_link.full_link;
    var full_link_hash = require('crypto').createHash('sha1').update(req_full_link).digest('hex');

    ShortLink.findOne({ url_hash: full_link_hash }, function(err, shortLink){
      if(err) { console.log("Something went wrong looking for short link with url_hash"); return; }
      var short_link = shortLink;

      if(!short_link) {
        var dt = new Date();
        var full_link_dt = req_full_link + dt.toString();
        short_link = new ShortLink({
          full_link : req_full_link,
          url_hash : require('crypto').createHash('sha1').update(req_full_link).digest('hex'),
          short_code : require('crypto').createHash('sha1').update(full_link_dt).digest('hex').toString().substring(0,5),
          created_at : new Date()
        });

        short_link.save(function(err){
          if(err) {
            console.log("Something went wrong while saving new short_link object");
          } else {
            console.log("Short Link saved!");
          }
        });
      }

      console.log(short_link);
      console.log("We send the full url back to show on the page");
    });
  });
}
