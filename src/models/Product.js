import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    categorie: {
      type: ObjectId,
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
