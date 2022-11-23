import { config } from "dotenv";
config();

export default {
  PORT: process.env.PORT,
  access_token: process.env.access_token,
  mongodbURL: process.env.MONGODB_URI
};
