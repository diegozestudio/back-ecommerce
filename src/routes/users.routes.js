import { Router } from "express";
import User from "../models/User";
import { Types } from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("cart");
  res.json(user);
});

router.post("/", async (req, res) => {
  const { name, email, phone, cart, register } = req.body;
  const user = {
    name,
    email,
    phone, // Types.ObjectId(categorie),
    cart,
    register,
  };
  const newUser = new User(user);
  const userSaved = await newUser.save();
  res.json(userSaved);
});

router.post("/addProductToCart", async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  user.cart.push(productId);
  const userSaved = await user.save();
  res.json(userSaved);
});

router.post("/deleteProductFromCart", async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  user.cart.pull(productId);
  const userSaved = await user.save();
  res.json(userSaved);
});

export default router;
