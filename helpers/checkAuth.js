module.exports = function(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};
