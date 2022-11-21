import { Router } from "express";
import mercadopago from "mercadopago";
import config from "../config";
const router = Router();

router.get("/", (req, res) => {
  mercadopago.configure({
    access_token: config.access_token,
  });

  let preference = {
    back_urls: {
      success: "http://localhost:3000/success",
      pending: "http://localhost:3000/pending",
      failure: "http://localhost:3000/failure",
    },
    items: [
      {
        title: "Mi producto",
        unit_price: 100,
        quantity: 1,
        currency_id: "ARS",
      },
    ],
    auto_return: "approved",
    notification_url: "https://b3f8-190-151-162-166.sa.ngrok.io/notification_url",
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
  res.json({ query: req.query, body: req.body, params: req.params });
});

router.get("/pending", (req, res) => {
  res.json({ query: req.query, body: req.body, params: req.params });
});

router.get("/success", (req, res) => {
  res.json({ query: req.query, body: req.body, params: req.params });
});

router.post("/notification_url", (req, res) => {
  console.log("entré el post");
  res.send()
//   res.json({ query: req.query, body: req.body, params: req.params });
});

export default router;
