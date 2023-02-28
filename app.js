var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// var logger = require("morgan");
var cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Documentation API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/**/*.js"],
};

const swaggerDocument = swaggerJSDoc(swaggerOptions);

const { sequelize } = require("./helpers/conection");
const response = require("./helpers/response");

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* Route initialization */
app.use("/api", routes);
// SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/* GET home page. */
app.get("/", function (req, res, next) {
  res.render("index", { title: "Hello World" });
});
app.use("*", (req, res) => {
  response.notfound(res, "Endpoint Not Found");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

sequelize.sync({
  force: false,
});

module.exports = app;
