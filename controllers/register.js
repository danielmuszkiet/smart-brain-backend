export const handleRegister = (db, bcrypt) => (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  console.log("test");
  db.transaction((trx) => {
    const hash = bcrypt.hashSync(password, 8);
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginemail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginemail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    res.status(400).json("unable to register");
  });
};
