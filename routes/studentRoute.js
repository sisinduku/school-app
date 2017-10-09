const express = require('express');
const router = express.Router();
const StudentCtrl = require('../controllers/studentCtrl');
const checkAuth = require('../helpers/checkAuth');
const checkPrivilege = require('../helpers/checkPrivilege');

router.use(function(req, res, next) {
  checkAuth(req, res, next);
});
router.use(function(req, res, next) {
  checkPrivilege(req, res, next);
});

router.get('/', (req, res) => {
  StudentCtrl.getIndex(req, res, {});
});

router.get('/add/', (req, res) => {
  StudentCtrl.getAdd(req, res, {});
});

router.post('/add/', (req, res) => {
  StudentCtrl.postStudent(req, res);
});

router.get('/:studentId/addsubject', (req, res) => {
  StudentCtrl.getAddSubject(req, res, {});
});

router.post('/:studentId/addsubject', (req, res) => {
  StudentCtrl.addSubject(req, res, {});
});

router.get('/edit/:studentId', (req, res) => {
  StudentCtrl.getEdit(req, res, {});
});

router.post('/edit/:studentId', (req, res) => {
  StudentCtrl.updateStudent(req, res);
});

router.get('/delete/:studentId', (req, res) => {
  StudentCtrl.deleteStudent(req, res);
});

module.exports = router;
