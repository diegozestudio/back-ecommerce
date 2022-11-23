import { Schema, model, Types } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    categorie: {
      type: Types.ObjectId,
      ref: "Categorie",
      required: true,
    },
    unit_price: {
      type: {},
      required: true,
    },
    description: {
      type: String,
    },
    details: {
      type: [Object],
    },
    images: {
      type: [String],
    },
    quantity: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);
