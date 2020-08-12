module.exports.authenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(403)
      .send({ error: true, message: "Debes estar loggeado" });
  }
  next();
};

module.exports.schemaValidation = (schema) => (req, res, next) => {
  const result = schema.validate(req.body);
  console.log(result);
  if (result.error) {
    return res.send({ message: result.error.message });
  }
  next();
};
