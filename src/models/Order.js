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
      default: "pending"
    },
    total_amount: {
      type: Number,
    },
    cart: {
      type: [Types.ObjectId],
      ref: "Product",
    },
    paymentId: {
      type: String,
    },
    paymentLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Order", orderSchema);
