const express = require('express');
const router = express.Router();
const SubjectCtrl = require('../controllers/subjectCtrl');
const checkAuth = require('../helpers/checkAuth');
const checkPrivilege = require('../helpers/checkPrivilege');

router.use(function(req, res, next) {
  checkAuth(req, res, next);
});
router.use(function(req, res, next) {
  checkPrivilege(req, res, next);
});

router.get('/', (req, res) => {
  SubjectCtrl.getIndex(req, res, {});
});

router.get('/:subjectId/enrolledstudents', (req, res) => {
  SubjectCtrl.getEnrolledStudents(req, res, {});
});

router.get('/:subjectId/:studentId/givescore', (req, res) => {
  SubjectCtrl.giveScore(req, res, {});
});

router.post('/:subjectId/:studentId/givescore', (req, res) => {
  SubjectCtrl.submitScore(req, res, {});
});

router.get('/add/', (req, res) => {
  SubjectCtrl.getAdd(req, res, {});
});

router.post('/add/', (req, res) => {
  SubjectCtrl.postSubject(req, res);
});

router.get('/delete/:subjectId', (req, res) => {
  SubjectCtrl.deleteSubject(req, res);
});

router.get('/edit/:subjectId', (req, res) => {
  SubjectCtrl.getEdit(req, res, {});
});

router.post('/edit/:subjectId', (req, res) => {
  SubjectCtrl.updateSubject(req, res);
});

module.exports = router;
