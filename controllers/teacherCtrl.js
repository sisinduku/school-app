const model = require('../models');
class TeacherCtrl {
  static getIndex(req, res, err = null, data = null, repopulate = null) {
    model.Teacher.findAll()
      .then(teachers => {
        res.render('show_list_teachers', {
          title: 'Show All Teachers',
          teachers: teachers,
          page: 'teachers-nav',
          err: err,
          data: data,
          repopulate: repopulate,
        });
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  static postTeacher(req, res) {
    model.Teacher.create(req.body)
      .then((inserted) => {
        this.getIndex(req, res, null, inserted);
      })
      .catch(reason => {
        this.getIndex(req, res, reason.errors[0], null, req.body);
      })
  }
}

module.exports = TeacherCtrl;
