const model = require('../models');
const decryptAES256CTR = require('../helpers/decryptAES256CTR');

class AuthCtrl {
  static getLoginPage(req, res, param) {
    res.render('login', {
      title: 'Login Page',
      page: 'login-nav',
      err: param.hasOwnProperty('err') ? param.err : null,
      session: req.session,
    });
  }

  static checkUser(req, res, param) {
    model.User.findOne({
        where: {
          username: req.body.username,
        }
      })
      .then(user => {
        if (user && req.body.password === decryptAES256CTR(user.password, user.secret)) {
          req.session.username = user.username;
          req.session.role = user.role;
          res.redirect('/');
        } else {
          this.getLoginPage(req, res, {
            err: 'Username and password combination not found',
          });
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  static getSignupPage(req, res, param) {
    res.render('add_user', {
      title: 'Signup Page',
      page: 'login-nav',
      err: param.hasOwnProperty('err') ? param.err : null,
      repopulate: param.hasOwnProperty('repopulate') ? param.repopulate : null,
      session: req.session,
    });
  }

  static signup(req, res) {
    model.User.create(req.body)
      .then(inserted => {
        res.render('signup_success', {
          title: 'Signup Success',
          page: 'login-nav',
          data: inserted,
          redirect: `setTimeout(function() {
                      window.location.replace("/auth/login")
                    }, 1000);`,
          session: req.session,
        });
      })
      .catch(reason => {
        this.getSignupPage(req, res, {
          err: reason,
        });
      });
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (!err)
        res.redirect('/auth/login');
      else
        console.log(err);
    });
  }
}

module.exports = AuthCtrl;
