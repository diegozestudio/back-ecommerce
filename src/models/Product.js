import { Schema, model, Types } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    categorieId: {
      type: Types.ObjectId,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
    },
    details: {
      type: Array,
    },
    images: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);
