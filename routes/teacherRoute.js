const express = require('express');
const router = express.Router();
const TeacherCtrl = require('../controllers/teacherCtrl');
const checkAuth = require('../helpers/checkAuth');
const checkPrivilege = require('../helpers/checkPrivilege');

router.use(function(req, res, next) {
  checkAuth(req, res, next);
});
router.use(function(req, res, next) {
  checkPrivilege(req, res, next);
});

router.get('/', (req, res) => {
  TeacherCtrl.getIndex(req, res, {});
});

router.post('/', (req, res) => {
  TeacherCtrl.postTeacher(req, res);
});

router.get('/edit/:teacherId', (req, res) => {
  TeacherCtrl.getEdit(req, res, {});
});

router.post('/edit/:teacherId', (req, res) => {
  TeacherCtrl.updateTeacher(req, res);
});

router.get('/delete/:teacherId', (req, res) => {
  TeacherCtrl.deleteTeacher(req, res);
});

module.exports = router;
