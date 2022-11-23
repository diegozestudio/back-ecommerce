import { Router } from "express";
import Order from "../models/Order";
import { Types } from "mongoose";

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
  const { userId, total_amount, cart, paymentLink } = req.body;
  console.log("entré al post de orders", {
    userId,
    cart,
    total_amount,
    paymentLink,
  });
  const order = {
    userId: Types.ObjectId(userId),
    total_amount,
    cart: cart.map((product) => Types.ObjectId(product)),
    paymentLink,
  };
  const newOrder = new Order(order);
  const orderSaved = await newOrder.save();
  res.json(orderSaved);
});

router.post("/editOrder/:orderId", async (req, res) => {
  const { paymentId, status, paymentLink } = req.body;
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (paymentLink) order.paymentLink = paymentLink;
  console.log({ paymentId });
  //   if (paymentId && !order.paymentId) order.paymentId = paymentId;
  if (status) order.status = status;
  const orderSaved = await order.save();
  res.json(orderSaved);
});

export default router;
