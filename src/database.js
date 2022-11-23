import { connect } from "mongoose";
import config from "./config";

(async () => {
  const db = await connect(config.mongodbURL);
  console.log("Database is connected to:", db.connection.name);
})();
