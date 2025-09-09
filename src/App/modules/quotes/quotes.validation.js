import Joi from "joi";

const createQuoteSchema = Joi.object({
  text: Joi.string().min(5).required().messages({
    "string.base": "Quote text must be a string",
    "string.min": "Quote text must be at least 5 characters",
    "any.required": "Quote text is required",
  }),
  author: Joi.string().min(2).required().messages({
    "string.base": "Author must be a string",
    "string.min": "Author must be at least 2 characters",
    "any.required": "Author is required",
  }),
  submittedByEmail: Joi.string().email().optional(),
});

const updateQuoteSchema = Joi.object({
  text: Joi.string().min(5),
  author: Joi.string().min(2),
}).min(1);

export const QuotesValidationSchema = {
  createQuoteSchema,
  updateQuoteSchema,
};
