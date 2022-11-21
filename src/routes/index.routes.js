import { Router } from "express";
import mercadopago from "mercadopago";
import config from "../config";
const router = Router();

router.get("/", (req, res) => {
  //   Crea un objeto de preferencia
  mercadopago.configure({
    access_token: config.access_token,
  });

  let preference = {
    items: [
      {
        title: "Mi producto",
        unit_price: 100,
        quantity: 1,
        currency_id: "ARS",
      },
    ],
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

export default router;
