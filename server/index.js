const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { authenticated } = require("./middlewares");
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const morgan = require("morgan");

app.use(bodyParser.json());

app.use(
  session({
    secret: "this is super secret",
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: { maxAge: 1000 * 60 * 60, sameSite: true },
  })
);

app.use(morgan("dev"));

app.use("/", userRoutes);
app.use("/todo", authenticated, todoRoutes);

app.listen(PORT, console.log("Server running"));
