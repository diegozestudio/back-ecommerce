import { Schema, model } from "mongoose";

const categorieSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Categorie", categorieSchema);
