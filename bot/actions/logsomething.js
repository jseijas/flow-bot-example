module.exports = function(session, args, next) {
  console.log(session.dialogData.view);
  next();
}
