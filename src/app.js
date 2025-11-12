const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authMiddleware = require("./middleware/auth");
const errorMiddleware = require("./middleware/error");
const userController = require("./controllers/user.controller");
const uploadController = require("./controllers/upload.controller");
const multer = require("multer");

const app = express();
const upload = multer(); // for handling multipart/form-data

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Rate limiter for endpoints
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);


app.post("/api/users/register", userController.register);
app.post("/api/users/login", userController.login);
app.post("/api/users/getUser", userController.getUser);

// ✅ For file upload
app.post("/api/files", upload.single("file"), uploadController.upload);

// Error handler
app.use(errorMiddleware);

module.exports = app;
