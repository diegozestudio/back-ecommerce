import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    cart: {
      type: [Types.ObjectId],
      ref: "Product",
    },
    register: {
      type: [Types.ObjectId],
      ref: "Order",
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
