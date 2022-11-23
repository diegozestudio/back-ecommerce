import { Router } from "express";
import Categorie from "../models/Categorie";

const router = Router();

router.get("/", async (req, res) => {
  const categories = await Categorie.find();
  res.json(categories);
});

router.post("/", async (req, res) => {
  // res.json({message: "entre al post"})
  const { name } = req.body;
  const categorie = { name };
  const newCategorie = new Categorie(categorie);
  const categorieSaved = await newCategorie.save();
  res.json(categorieSaved);
});

export default router;
