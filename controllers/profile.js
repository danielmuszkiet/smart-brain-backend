export const handleProfileGet = (db) => (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where("id", id)
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        throw new Error("not found");
      }
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
};
