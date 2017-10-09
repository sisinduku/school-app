const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    page: 'home-nav',
    session: req.session,
  });
});

module.exports = router;
