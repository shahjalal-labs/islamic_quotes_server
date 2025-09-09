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
