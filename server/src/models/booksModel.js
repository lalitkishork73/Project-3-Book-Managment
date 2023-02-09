const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

//<======================== BookSchema Stucture ==============================>//

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    bookCover: {
      type: String,
      require: true,
      trim: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    subcategory: [
      {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
    ],
    reviews: {
      type: Number,
      default: 0,
      trim: true,
    },

    deletedAt: {
      type: Date,
      trim: true,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    releasedAt: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Book", BookSchema);
