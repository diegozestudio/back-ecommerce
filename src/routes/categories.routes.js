import { Router } from "express";
import { getCategorieById } from "../controllers/categories";
import Categorie from "../models/Categorie";

const router = Router();

router.get("/", async (req, res) => {
  const categories = await Categorie.find();
  res.json(categories);
});

router.get("/:categorieId", async (req, res) => {
  const { categorieId } = req.params;
  const categorie = await getCategorieById(categorieId);
  res.json(categorie);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const categorie = { name };
  const newCategorie = new Categorie(categorie);
  const categorieSaved = await newCategorie.save();
  res.json(categorieSaved);
});

export default router;
