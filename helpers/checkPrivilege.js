module.exports = function(req, res, next) {
  let privilegeTeacher = ['/students'];
  let privilegeAcademic = ['/students', '/subjects'];
  let privilegeHeadmaster = ['/students', '/subjects', '/teachers'];

  switch (req.session.role) {
    case 'teacher':
      if (privilegeTeacher.indexOf(req.baseUrl) != -1)
        next();
      else
        res.redirect('/auth/unauthorized');
      break;
    case 'academic':
      if (privilegeAcademic.indexOf(req.baseUrl) != -1)
        next();
      else
        res.redirect('/auth/unauthorized');
      break;
    case 'headmaster':
      if (privilegeHeadmaster.indexOf(req.baseUrl) != -1)
        next();
      else
        res.redirect('/auth/unauthorized');
      break;
  }
};
