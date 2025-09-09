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
