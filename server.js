import express, { response } from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import knex from "knex";
import { handleRegister } from "./controllers/register.js";
import { handleSignin } from "./controllers/signin.js";
import { handleImage, handleApiCall } from "./controllers/image.js";
import { handleProfileGet } from "./controllers/profile.js";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "YOUR_DB_NAME",
    port: 5432,
    password: "",
    database: "smart-brain",
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((data) => {
      res.json(data);
    });
});

app.post("/signin", handleSignin(db, bcrypt));

app.post("/register", handleRegister(db, bcrypt));

app.get("/profile/:id", handleProfileGet(db));

app.put("/image", handleImage(db));

app.post("/imageurl", handleApiCall);

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
