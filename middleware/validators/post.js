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

const validateCreate = () => {
  const schema = {
    title: {
      in: ['body'],
      notEmpty: true,
      errorMessage: "The title isn't valid",
    },
    content: {
      in: ['body'],
      notEmpty: true,
      errorMessage: "The content isn't valid",
    },
    image: {
      in: ['body'],
      optional: true,
      isURL: true,
      errorMessage: "The image url isn't valid",
    },
    category: {
      in: ['body'],
      isInt: true,
      errorMessage: "The category isn't valid",
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
  validateCreate,
  validateDelete,
};
