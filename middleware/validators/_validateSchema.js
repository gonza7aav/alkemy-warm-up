const { checkSchema, validationResult } = require('express-validator');

// This function will be used in all validators
// It shouldn't be call directly. (Use the validator instead)

// https://express-validator.github.io/docs/running-imperatively.html
module.exports = (schema) => async (req, res, next) => {
  // Get the validations through the received schema
  const validations = checkSchema(schema);

  // Resolve the validations (promises) with its run method
  await Promise.all(validations.map((validation) => validation.run(req)));

  // Go to the next function, if it's all ok
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  // Keep only the error messages
  const errorsMessages = errors.errors.map((x) => x.msg);

  // Delete the duplicate messages
  const filteredErrors = errorsMessages.filter(
    (el, idx) => idx === errorsMessages.indexOf(el)
  );

  return res.status(400).json({ errors: filteredErrors });
};
