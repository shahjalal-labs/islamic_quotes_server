import { ObjectId } from "mongodb";
import { getDB } from "../../config/db.js";

const getQuotesCollection = () => {
  const quotesCollection = getDB().collection("quotes");

  return quotesCollection;
};
const quotesCollection = getQuotesCollection();

const createQuoteIntoDB = async (coffee) => {
  // const recipeCollection = getQuotesCollection();

  const response = await quotesCollection.insertOne(coffee);
  return response;
};

const createMultipleQuoteIntoDB = async (coffees) => {
  // const recipeCollection = getQuotesCollection();
  const response = await quotesCollection.insertMany(coffees);
  return response;
};

const getQuotesFromDB = async (query) => {
  const limit = query.limit || 0;
  const email = query.email;
  // const recipeCollection = await getQuotesCollection();
  let response;
  if (email) {
    response = await quotesCollection
      .find({ userEmail: email })
      .sort({ likeCount: -1 })
      .limit(limit)
      .toArray();
    return response;
  }
  response = await quotesCollection
    .find()
    .sort({ likeCount: -1 })
    .limit(limit)
    .toArray();
  return response;
};

const getSingleQuoteFromDB = async (id) => {
  // const recipeCollection = await getQuotesCollection();
  const response = await quotesCollection.findOne({ _id: new ObjectId(id) });

  return response;
};

const deleteQuoteFromDB = async (id) => {
  // const recipeCollection = await getQuotesCollection();
  const response = await quotesCollection.deleteOne({ _id: new ObjectId(id) });
  return response;
};

const updateQuoteIntoDB = async (id, coffee) => {
  // const recipeCollection = await getQuotesCollection();

  const filter = {
    _id: new ObjectId(id),
  };

  const updateDoc = {
    $set: coffee,
  };
  const options = {
    upsert: false,
  };
  const response = await quotesCollection.updateOne(filter, updateDoc, options);
  return response;
};

export const QuotesServices = {
  createQuoteIntoDB,
  getQuotesFromDB,
  getSingleQuoteFromDB,
  deleteQuoteFromDB,
  updateQuoteIntoDB,
  createMultipleQuoteIntoDB,
};
