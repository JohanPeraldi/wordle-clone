const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.get("/word", (req, res) => {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getRandom",
    params: { wordLength: "5" },
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };
  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/check", (req, res) => {
  const word = req.query.word;

  const options = {
    method: "GET",
    url: "https://twinword-word-graph-dictionary.p.rapidapi.com/association/",
    params: { entry: word },
    headers: {
      "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data.result_msg);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/word`)
);
