import { Router } from "express";
import mercadopago from "mercadopago";
import config from "../config";

const router = Router();

mercadopago.configure({
  access_token: config.access_token,
});

const product = {
  id: 1234567890,
  title: "Producto Increíble",
  unit_price: 100,
};

router.get("/", (req, res) => {
  const userId = "12435diego12343";

  let preference = {
    back_urls: {
      success: "http://localhost:3000/success",
      pending: "http://localhost:3000/pending",
      failure: "http://localhost:3000/failure",
    },
    items: [
      {
        id: product.id,
        title: product.title,
        unit_price: product.unit_price,
        quantity: 2,
        currency_id: "ARS",
      },
      {
        id: 99999999,
        title: "segundo producto",
        unit_price: 300,
        quantity: 1,
        currency_id: "ARS",
      },
    ],
    // auto_return: "approved",
    notification_url: `https://d199-190-151-162-163.sa.ngrok.io/notification/${userId}/${product.id}`,
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/success", (req, res) => {
  res.json({ message: "success" });
});

router.get("/pending", (req, res) => {
  res.json({ message: "pending" });
});

router.get("/failure", (req, res) => {
  res.json({ message: "failure" });
});

router.post("/notification/:userId/:productId", async (req, res) => {
  const { query } = req;
  const { userId, productId } = req.params;
  const topic = query.topic;
  let merchantOrder = null;

  if (topic) {
    if (topic === "payment") {
      const paymentId = query.id;
      const payment = await mercadopago.payment.findById(paymentId);
      merchantOrder = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );
      console.log(topic, merchantOrder.body.payments);
    }

    if (topic === "merchant_order") {
      const orderId = query.id;
      merchantOrder = await mercadopago.merchant_orders.findById(orderId);
      console.log(topic, merchantOrder.body.payments);
    }

    let paidAmount = 0;
    merchantOrder.body.payments.forEach((payment) => {
      if (payment.status === "approved") {
        paidAmount += payment.transaction_amount;
      }
    });
    if (paidAmount >= merchantOrder.body.total_amount) {
      console.log(
        `Se completó el pago del usuario ${userId}, del producto ${productId}`
      );
      res.sendStatus(200);
    } else {
      console.log(
        `No se completó el pago del usuario ${userId}, del producto ${productId}`
      );
    }
  }
});

export default router;
