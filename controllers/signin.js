export const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("no no no!");
  }
  db("login")
    .select("email", "hash")
    .where("email", email)
    .then((data) => {
      if (data.length > 0) {
        const isValid = bcrypt.compareSync(password, data[0].hash);

        if (isValid) {
          db("users")
            .select("*")
            .where("email", email)
            .then((user) => {
              res.json(user[0]);
            });
        } else {
          throw new Error("unable to login");
        }
      } else {
        throw new Error("unable to login");
      }
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};
