// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  const unix = new Date().getTime();
  const utc = new Date().toUTCString();
  res.json({ unix, utc });
});

app.get("/api/:date", (req, res) => {
  let date = new Date(req.params.date);
  let unix, utc;
  console.log(req.params.date);
  console.log(date);

  if (isNaN(date)) {
    console.log(isNaN(date));
    unix = parseInt(req.params.date);
    if (new Date(unix).toUTCString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    utc = new Date(unix).toUTCString();
  } else {
    unix = date.getTime();
    utc = date.toUTCString();
  }
  res.json({ unix, utc });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
