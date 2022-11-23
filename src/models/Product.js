import { Schema, model, Types } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    categorie: {
      type: Types.ObjectId,
      ref: "Categorie",
      required: true,
    },
    price: {
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
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);
