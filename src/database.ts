import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/api-db-node-auth")
  .then((db) => console.log("DB connected"))
  .catch((error) => console.error(error));
