import { Schema, model } from "mongoose";

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
      type: Double,
    },
    cart: {
      type: Array,
    },
    register: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
