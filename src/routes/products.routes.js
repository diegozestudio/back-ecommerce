import { Router } from "express";
import Product from "../models/Product";
import { Types } from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find().populate("categorie");
  res.json(products);
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId).populate("categorie");
  res.json(product);
});

router.get("/byCategorie/:categorieId", async (req, res) => {
  const { categorieId } = req.params;
  const products = await Product.find({ categorie: categorieId });
  res.json(products);
});

router.post("/", async (req, res) => {
  const { title, unit_price, categorie, details, description, images } = req.body;
  const product = {
    title,
    unit_price,
    categorie: Types.ObjectId(categorie),
    details,
    description,
    images,
  };
  const newProduct = new Product(product);
  const productSaved = await newProduct.save();
  res.json(productSaved);
});

router.post("/editCategorie", async (req, res) => {
  const { categorieId, productId } = req.body;
  const product = await Product.findById(productId);
  product.categorie = Types.ObjectId(categorieId);
  const productSaved = await product.save();
  res.json(productSaved);
});

export default router;
