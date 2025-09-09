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
