const validateSchema = require('./_validateSchema');

const validateSearch = () => {
  const schema = {
    id: {
      in: ['params'],
      isInt: true,
      errorMessage: "The post id isn't valid",
    },
  };

  return validateSchema(schema);
};

const validateDelete = () => {
  const schema = {
    id: {
      in: ['params'],
      isInt: true,
      errorMessage: "The post id isn't valid",
    },
  };

  return validateSchema(schema);
};

module.exports = {
  validateSearch,
  validateDelete,
};
