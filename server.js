import express, { response } from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import knex from "knex";
import { handleRegister } from "./controllers/register.js";
import { handleSignin } from "./controllers/signin.js";
import { handleImage, handleApiCall } from "./controllers/image.js";
import { handleProfileGet } from "./controllers/profile.js";

const PORT = process.env.PORT;
console.log(PORT);
console.log("Das ist ein Test");
const db = knex({
  client: "pg",
  connection: {
    host: "dpg-cn6cdsgl5elc73flro0g-a",
    user: "smartbraindb_66ot_user",
    port: 5432,
    password: "N0T6GredMQd4JM96yXe9yegizglbzrsP",
    database: "smartbraindb_66ot",
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

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
