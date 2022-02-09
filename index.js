const express = require("express");
const axios = require("axios").default;
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;

const app = express();

app.get("/word", (req, res) => {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
    params: { count: "5", wordLength: "5" },
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": "78f33bb81dmsha759a187650b888p194961jsn3d74783adfb2",
    },
  };
  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data[0]);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/word`)
);
