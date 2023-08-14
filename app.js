const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.js");
const videoRoutes = require("./routes/video.js");
const commentRoutes = require("./routes/comment.js");
const productRoutes = require("./routes/product.js");
const authRoutes = require("./routes/auth.js");
const cookieParser = require("cookie-parser");
var cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  connect();
  console.log(`server running on port: ${PORT}`);
});
