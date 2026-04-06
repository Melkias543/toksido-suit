export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,   // show all errors
    stripUnknown: true,  // remove unwanted fields
  });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((e) => e.message),
    });
  }

  req.body = value; // cleaned data
  next();
};