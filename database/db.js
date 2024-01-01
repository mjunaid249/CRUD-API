import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "CRUD-API",
  })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log({ message: err.message });
  });
