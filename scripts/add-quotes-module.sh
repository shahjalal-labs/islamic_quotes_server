#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(pwd)"
MODULE_DIR="src/App/modules/quotes"

echo "Creating quotes module at $ROOT_DIR/$MODULE_DIR ..."

mkdir -p "$MODULE_DIR"

cat > "$MODULE_DIR/quoteData.json" <<'EOF'
[
  {
    "_id": "q1",
    "text": "Indeed, with hardship comes ease.",
    "author": "Quran",
    "submittedByEmail": "user1@example.com",
    "status": "approved",
    "createdAt": "2025-09-01T00:00:00.000Z"
  },
  {
    "_id": "q2",
    "text": "Actions are judged by intentions.",
    "author": "Prophet Muhammad (pbuh)",
    "submittedByEmail": "user2@example.com",
    "status": "pending",
    "createdAt": "2025-09-02T00:00:00.000Z"
  }
]
EOF

cat > "$MODULE_DIR/quotes.model.js" <<'EOF'
import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Quote text is required"],
      trim: true,
      minlength: [5, "Quote text must be at least 5 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    submittedByEmail: {
      type: String,
      required: [true, "Submitter email is required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
EOF

cat > "$MODULE_DIR/quotes.service.js" <<'EOF'
import Quote from "./quotes.model.js";
import mongoose from "mongoose";

const createQuoteInDB = async (data) => {
  const quote = new Quote(data);
  return await quote.save();
};

const getAllQuotesFromDB = async (filter = {}) => {
  const query = {};

  if (filter.status) query.status = filter.status;

  if (filter.searchTerm) {
    const re = { $regex: filter.searchTerm, $options: "i" };
    query.$or = [{ text: re }, { author: re }, { submittedByEmail: re }];
  }

  return await Quote.find(query).sort({ createdAt: -1 });
};

const getQuoteByIdFromDB = async (id) => {
  if (!mongoose.isValidObjectId(id)) return null;
  return await Quote.findById(id);
};

const updateQuoteInDB = async (id, updatedData) => {
  return await Quote.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

const approveQuoteInDB = async (id) => {
  return await Quote.findByIdAndUpdate(
    id,
    { status: "approved" },
    { new: true, runValidators: true }
  );
};

const deleteQuoteFromDB = async (id) => {
  return await Quote.findByIdAndDelete(id);
};

export const QuoteServices = {
  createQuoteInDB,
  getAllQuotesFromDB,
  getQuoteByIdFromDB,
  updateQuoteInDB,
  approveQuoteInDB,
  deleteQuoteFromDB,
};
EOF

cat > "$MODULE_DIR/quotes.controllers.js" <<'EOF'
import sendResponse from "../../utils/sendResponse.js";
import { QuoteServices } from "./quotes.service.js";

const createQuote = async (req, res, next) => {
  try {
    const submitterEmail = req.user?.email || req.body.submittedByEmail;
    const payload = {
      text: req.body.text,
      author: req.body.author,
      submittedByEmail: submitterEmail,
    };
    if (req.user?.id) payload.submittedBy = req.user.id;

    const result = await QuoteServices.createQuoteInDB(payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Quote submitted successfully and is pending approval.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllQuotes = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (search) filters.searchTerm = search;

    const result = await QuoteServices.getAllQuotesFromDB(filters);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quotes retrieved successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await QuoteServices.getQuoteByIdFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quote retrieved successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requester = req.user || {};
    const quote = await QuoteServices.getQuoteByIdFromDB(id);
    if (!quote) throw new Error("Quote not found");

    const isCreator =
      (quote.submittedBy && requester.id && quote.submittedBy.toString() === requester.id) ||
      quote.submittedByEmail === requester.email;

    if (!isCreator && requester.role !== "admin") {
      throw new Error("Only the creator or an admin can update this quote");
    }

    const result = await QuoteServices.updateQuoteInDB(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quote updated successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const approveQuote = async (req, res, next) => {
  try {
    const requester = req.user || {};
    if (requester.role !== "admin") {
      throw new Error("Only admin can approve quotes");
    }
    const { id } = req.params;
    const quote = await QuoteServices.getQuoteByIdFromDB(id);
    if (!quote) throw new Error("Quote not found");

    if (quote.status === "approved") {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Quote is already approved.",
        data: quote,
      });
      return;
    }

    const result = await QuoteServices.approveQuoteInDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quote approved successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requester = req.user || {};
    const { email: bodyEmail } = req.body || {};

    const quote = await QuoteServices.getQuoteByIdFromDB(id);
    if (!quote) throw new Error("Quote not found");

    if (quote.status === "approved" && requester.role !== "admin") {
      throw new Error("Approved quotes can only be deleted by an admin.");
    }

    const isCreator =
      (quote.submittedBy && requester.id && quote.submittedBy.toString() === requester.id) ||
      quote.submittedByEmail === requester.email ||
      quote.submittedByEmail === bodyEmail;

    if (!isCreator && requester.role !== "admin") {
      throw new Error("Only the creator or an admin can delete this quote.");
    }

    const result = await QuoteServices.deleteQuoteFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Quote deleted successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const QuoteControllers = {
  createQuote,
  getAllQuotes,
  getSingleQuote,
  updateQuote,
  approveQuote,
  deleteQuote,
};
EOF

cat > "$MODULE_DIR/quotes.validation.js" <<'EOF'
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
EOF

cat > "$MODULE_DIR/quotes.route.js" <<'EOF'
import express from "express";
import { QuoteControllers } from "./quotes.controllers.js";
import validateRequest from "../../utils/validateRequest.js";
import { QuotesValidationSchema } from "./quotes.validation.js";
import { verifyToken } from "../auth/jwt.js";
import verifyEmail from "../auth/verifyEmail.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  verifyEmail,
  validateRequest(QuotesValidationSchema.createQuoteSchema),
  QuoteControllers.createQuote
);

router.get("/", QuoteControllers.getAllQuotes);
router.get("/:id", QuoteControllers.getSingleQuote);

router.patch(
  "/:id",
  verifyToken,
  validateRequest(QuotesValidationSchema.updateQuoteSchema),
  QuoteControllers.updateQuote
);

router.patch("/approve/:id", verifyToken, QuoteControllers.approveQuote);

router.delete("/:id", verifyToken, verifyEmail, QuoteControllers.deleteQuote);

export const QuoteRoutes = router;
EOF

cat > "$MODULE_DIR/quotesApi.hurl" <<'EOF'
GET http://localhost:5000/api/v1/quotes
GET http://localhost:5000/api/v1/quotes?status=approved
GET http://localhost:5000/api/v1/quotes?search=hardship

POST http://localhost:5000/api/v1/quotes
Content-Type: application/json
Cookie: token=YOUR_JWT_COOKIE
{
  "text": "Patience is half of faith.",
  "author": "Prophet Muhammad (pbuh)",
  "submittedByEmail": "student@example.com"
}

PATCH http://localhost:5000/api/v1/quotes/<<QUOTE_ID>>/approve
Cookie: token=ADMIN_JWT_COOKIE

PATCH http://localhost:5000/api/v1/quotes/<<QUOTE_ID>>
Content-Type: application/json
Cookie: token=YOUR_JWT_COOKIE
{
  "text": "Updated quote text"
}

DELETE http://localhost:5000/api/v1/quotes/<<QUOTE_ID>>
Cookie: token=YOUR_JWT_COOKIE
Content-Type: application/json
{
  "email": "student@example.com"
}
EOF

echo "All files created under $MODULE_DIR"

# add & commit
git add "$MODULE_DIR"
git commit -m "refactor: added improved assignments version" || {
  echo "git commit failed (maybe no changes)."
}

echo "Done."

