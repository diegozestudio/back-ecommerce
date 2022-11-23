import { Router } from "express";
import Product from "../models/Product";
import { Types } from "mongoose";
import { getCategorieById } from "../controllers/categories";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  const categorie = await getCategorieById(product.categorieId);
  const { ...newProduct } = { ...product._doc, categorie: categorie.name };
  res.json(newProduct);
});

router.post("/", async (req, res) => {
  const { name, price, categorieId, details, description, images } = req.body;
  const product = {
    name,
    price,
    categorieId: Types.ObjectId(categorieId),
    details,
    description,
    images,
  };
  const newProduct = new Product(product);
  const productSaved = await newProduct.save();
  res.json(productSaved);
  //   ObjectId("637d9549e5bc1ac0646ac38a");
  //   res.json(ObjectId("637d9549e5bc1ac0646ac38a"));
});

export default router;
