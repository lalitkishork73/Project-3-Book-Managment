const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

//<=========================== Review Schema  ================================>//

const reviewSchema = new mongoose.Schema(
  {
    bookId: {
      type: ObjectId,
      required: "bookId is required",
      ref: "Book",
    },
    reviewedBy: {
      type: String,
      required: "reviewedBy is required",
      default: "Guest",
      trim: true,
    },
    reviewedAt: { type: Date, required: "reviewedAt is required" },
    rating: { type: Number, required: "rating is required" },
    review: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
