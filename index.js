import express from "express";
import dotenv from "dotenv";
import "./database/db.js";
dotenv.config();
import { User } from "./models/User.js";

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working Fine!");
});

//Adding a User
app.post("/users/add", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    const Added_User = await User.create({
      name,
      email,
      password,
      age,
    });

    res.status(201).json({ message: "User added Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});

//get all users

app.get("/users/get", async (req, res) => {
  try {
    const All_Users = await User.find({});

    res.json({
      count: All_Users.length,
      data: All_Users,
    });
  } catch (err) {
    console.log("No Users Found!");
    res.json({ message: err.message });
  }
});

//Get only one User

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const one_user = await User.findById(id);
    res.status(200).send(one_user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

//Updating a User

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated_user = await User.findByIdAndUpdate(id, req.body);

    res.status(200).send({ message: "User Updated Successfully!" });
  } catch (error) {
    res.send("error is updating a User");
  }
});

//deleting a user

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
  }
});

//Listning of Server

app.listen(PORT, () => {
  console.log(`Servere is working at http://localhost:${PORT}`);
});
