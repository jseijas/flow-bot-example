module.exports = function(session, args, next) {
  console.log(session.view);
  next();
}
