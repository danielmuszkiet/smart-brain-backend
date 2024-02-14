const setupClarify = (imgURL) => {
  const PAT = "YOUR_CLARIFY_KEY";
  const USER_ID = "YOUR_CLARIFAI_ID";
  const APP_ID = "YOUR_APP_ID";
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
    .catch((err) => res.status(400).json("check URL"));
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
