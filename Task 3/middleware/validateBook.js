const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  price: Joi.number().min(0).required(),
});

module.exports = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
