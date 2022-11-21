import express from "express";
import morgan from "morgan";
import config from "./config";
import indexRoutes from "./routes/index.routes";

const app = express();

// settings
app.set("port", config.PORT);

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use(indexRoutes);

export default app;
