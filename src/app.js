const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require("request");

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials/");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);



app.get("/", (req, res) => {
  const url ="https://newsapi.org/v2/top-headlines?country=eg&apiKey=43131ec4c30c4dedb9efa8a3416e9941";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("error");
    } else {
      res.render("index", {
        data: response.body.articles,
      });
    }
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
