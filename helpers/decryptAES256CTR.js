module.exports = function(crypted, secret) {
  var crypto = require('crypto');
  var decipher = crypto.createDecipher('aes-256-ctr', secret)
  var dec = decipher.update(crypted, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
};
