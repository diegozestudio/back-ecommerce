import { Router } from "express";
import Order from "../models/Order";
import User from "../models/User";
import { Types } from "mongoose";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  const orders = await Order.find(); //.populate("userId").populate("cart");
  res.json(orders);
});

// router.get("/:productId", async (req, res) => {
//   const { productId } = req.params;
//   const product = await Product.findById(productId).populate("categorie");
//   res.json(product);
// });

// router.get("/byCategorie/:categorieId", async (req, res) => {
//   const { categorieId } = req.params;
//   const products = await Product.find({ categorie: categorieId });
//   res.json(products);
// });

router.post("/", async (req, res) => {
  const { userId, total_amount, cart } = req.body;
  const order = {
    userId: Types.ObjectId(userId),
    total_amount,
    cart: cart.map((product) => Types.ObjectId(product)),
  };
  const newOrder = new Order(order);
  const orderSaved = await newOrder.save();
  await axios.post("http://localhost:3000/users/addOrder", {
    userId,
    orderId: orderSaved._id.toString(),
  });
  res.send(orderSaved);
});

router.post("/editOrder/:orderId", async (req, res) => {
  const { paymentId, status, paymentLink } = req.body;
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (paymentLink) order.paymentLink = paymentLink;
  if (paymentId && order) order.paymentId = paymentId;
  if (status) order.status = status;
  const orderSaved = await order.save();
  res.send(orderSaved);
});

export default router;
