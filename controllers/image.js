const setupClarify = (imgURL) => {
  const PAT = "4d7976a20c164c618422ea8323dfb934";
  const USER_ID = "danielmuszkiet";
  const APP_ID = "SmartBrain";
  const IMAGE_URL = imgURL;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

export const handleApiCall = (req, res) => {
  fetch(
    "https://api.clarifai.com/v2/models/face-detection/outputs",
    setupClarify(req.body.input)
  )
    .then((data) => data.json())
    .then((response) => {
      res.json(response.outputs[0].data.regions);
    })
    .catch((err) => res.status(400).json(err.message));
};

export const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .returning("*")
    .increment({
      entries: 1,
    })
    .where("id", "=", id)
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => {
      res.status(400).json("not found (entries)");
    });
};
