const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

// const withUseAuth = (req, res, next) => {
//     if (!req.session.skill_id) {
//       res.redirect('/login');
//     } else {
//       next();
//     }
//   };
  
// const withEmpAuth = (req, res, next) => {
//     if (!req.session.url) {
//       res.redirect('/');
//     } else {
//       next();
//     }
// };
  

  module.exports = {  withAuth };
