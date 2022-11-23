import { Router } from "express";
import mercadopago from "mercadopago";
import config from "../config";
import axios from "axios";

const router = Router();

mercadopago.configure({
  access_token: config.access_token,
});

const product = {
  id: 1234567890,
  title: "Producto Increíble",
  unit_price: 100,
};

router.post("/getPayment", async (req, res) => {
  const { userId, cart } = req.body;
  const cartFormated = cart.map((product) => {
    return {
      id: product._id,
      title: product.title,
      unit_price: product.unit_price.usd,
      quantity: product.quantity,
      currency_id: "ARS",
    };
  });
  const cartIds = cart.map((product) => product._id);
  const total_amount = cart.reduce((acc, cur) => {
    return acc + cur.unit_price.usd * cur.quantity;
  }, 0);

  const order = await axios.post("http://localhost:3000/orders", {
    userId,
    cart: cartIds,
    total_amount,
  });

  // let someDate = new Date();
  // let numberOfDaysToAdd = 1;
  // let result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  // let resultFormated = new Date(result).toISOString();

  // let someDate = new Date();
  // let minutesToAd = 1;
  // let newDateObj = new Date(someDate.getTime() + minutesToAd * 60000);
  // let resultFormated = newDateObj.toISOString();

  let preference = {
    back_urls: {
      success: "http://localhost:3000/success",
      pending: "http://localhost:3000/pending",
      failure: "http://localhost:3000/failure",
    },
    items: cartFormated,
    // auto_return: "approved",
    // date_of_expiration: resultFormated,
    notification_url: `https://1306-190-151-162-163.sa.ngrok.io/mercadopago/notification/${userId}/${order.data._id}`,
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      return axios.post(
        `http://localhost:3000/orders/editOrder/${order.data._id}`,
        {
          paymentLink: response.body.init_point,
        }
      );
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
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

router.post("/notification/:userId/:order", async (req, res) => {
  const { query } = req;
  const { order } = req.params;
  const topic = query.topic;
  let merchantOrder = null;
  let orderId = null;

  if (topic) {
    if (topic === "payment") {
      const paymentId = query.id;
      const payment = await mercadopago.payment.findById(paymentId);
      orderId = payment.body.order.id;
      merchantOrder = await mercadopago.merchant_orders.findById(orderId);
    }

    if (topic === "merchant_order") {
      orderId = query.id;
      merchantOrder = await mercadopago.merchant_orders.findById(orderId);
    }

    let paidAmount = 0;
    merchantOrder.body.payments.forEach((payment) => {
      if (payment.status === "approved") {
        paidAmount += payment.transaction_amount;
      }
    });

    if (paidAmount >= merchantOrder.body.total_amount) {
      const orderEdited = await axios.post(
        `http://localhost:3000/orders/editOrder/${order}`,
        {
          paymentId: orderId,
          status: "success",
        }
      );
      res.send(orderEdited.data);
    } else {
      const orderEdited = await axios.post(
        `http://localhost:3000/orders/editOrder/${order}`,
        {
          paymentId: orderId,
        }
      );
      res.send(orderEdited.data);
    }
  }
});

export default router;
