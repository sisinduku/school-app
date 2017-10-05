const model = require('../models');
class SubjectCtrl {
  static getIndex(req, res, err = null, data = null, repopulate = null) {
    model.Subject.findAll()
      .then(subjects => {
        res.render('show_list_subjects', {
          title: 'Show All Teachers',
          subjects: subjects,
          page: 'subjects-nav',
          err: err,
          data: data,
          repopulate: repopulate,
        });
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  static postSubjects(req, res) {
    model.Subjects.create(req.body)
      .then((inserted) => {
        this.getIndex(req, res, null, inserted);
      })
      .catch(reason => {
        this.getIndex(req, res, reason.errors[0], null, req.body);
      })
  }
}

module.exports = SubjectCtrl;
