const path = require("path");

const express = require("express");

const blogRoutes = require("./routes/blog");

const db = require("./data/database");

const app = express();

// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static("public")); // Serve static files

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  // Default error handling function

  console.log(error);
  res.status(500).render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000); //once the database established the server will start listening
});
