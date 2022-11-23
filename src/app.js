import express from "express";
import morgan from "morgan";
import config from "./config";
import mercadopagoRoutes from "./routes/mercadopago.routes";
import categoriesRoutes from "./routes/categories.routes";
import productsRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";

const app = express();

// settings
app.set("port", config.PORT);

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/mercadopago", mercadopagoRoutes);
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

export default app;
