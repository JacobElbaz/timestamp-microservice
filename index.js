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
  const date = req.params.date;
  console.log(date);
  console.log(new Date(date));
  if (
    !new Date(date).getTime() &&
    new Date(parseInt(date)).toUTCString() === "Invalid Date"
  ) {
    res.json({ error: "Invalid Date" });
  } else if (date.includes("-")) {
    const unix = new Date(date).getTime();
    const utc = new Date(date).toUTCString();
    res.json({ unix, utc });
  } else
    res.json({
      unix: parseInt(date),
      utc: new Date(parseInt(date)).toUTCString(),
    });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
