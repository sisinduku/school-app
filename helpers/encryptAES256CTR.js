module.exports = function(text, secret) {
  var crypto = require('crypto');
  var cipher = crypto.createCipher('aes-256-ctr', secret)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
};
