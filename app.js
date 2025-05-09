//#region imports
const express = require("express");
const app = express();
const cros = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
//#endregion imports

//#region routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
//#endregion routes

//#region middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cros({
    origin: "https://endearing-klepon-99c653.netlify.app",
  })
);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.set(
        "Access-Control-Allow-Origin",
        "https://endearing-klepon-99c653.netlify.app"
      );
    },
  })
);
//#endregion middlewares

//#region endpoints
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
//#endregion endpoints

module.exports = app;
