import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: ObjectId,
    },
    status: {
      type: String,
    },
    products: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Order", orderSchema);
