const express = require('express');
const router = express.Router();
const TeacherCtrl = require('../controllers/teacherCtrl');

router.get('/', (req, res) => {
  TeacherCtrl.getIndex(req, res);
});

router.post('/', (req, res) => {
  TeacherCtrl.postTeacher(req, res);
});

router.get('/edit/:teacherId', (req, res) => {
  TeacherCtrl.getEdit(req, res);
});

module.exports = router;
