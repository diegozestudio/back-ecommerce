import { Schema, model } from "mongoose";
import Product from "./Product";
import { Types } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
    },
    total_amount: {
      type: Number,
    },
    products: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Order", orderSchema);
