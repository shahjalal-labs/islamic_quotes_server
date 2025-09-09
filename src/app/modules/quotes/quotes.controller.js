import sendResponose from "../../../utils/sendResponose.js";

import { QuotesServices } from "./quotes.service.js";

const createQuote = async (req, res, next) => {
  const coffee = req.body;
  try {
    const response = await QuotesServices.createQuoteIntoDB(coffee);
    sendResponose(res, {
      success: true,
      message: "Quote created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const createMultipleQuote = async (req, res, next) => {
  const quotes = req.body;
  try {
    const response = await QuotesServices.createMultipleQuoteIntoDB(quotes);
    sendResponose(res, {
      success: true,
      message: "Quotes created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getQuotes = async (req, res, next) => {
  try {
    const email = req.query.email;

    const limit = Number(req.query.limit) || 0;
    const likeCount = req.query.likeCount;
    const response = await QuotesServices.getQuotesFromDB({
      email,
      likeCount,
      limit,
    });
    sendResponose(res, {
      success: true,
      message: "All coffees fetched successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleQuote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await QuotesServices.getSingleQuoteFromDB(id);
    sendResponose(res, {
      success: true,
      message: "Single coffee fetched successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const updateQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coffee = req.body;
    const response = await QuotesServices.updateQuoteInDB(id, coffee);
    sendResponose(res, {
      success: true,
      message: "Quote updated successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const deleteaQuote = async (req, res, next) => {
  try {
    const result = await QuotesServices.deleteQuoteFromDB(req.params.id);
    sendResponose(res, {
      success: true,
      message: "Quote deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const QuotesControllers = {
  createQuote,
  getQuotes,
  getSingleQuote,
  updateQuote,
  createMultipleQuote,
  deleteaQuote,
};
