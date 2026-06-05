const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const aiRoutes = require("./routes/aiRoutes");
const userRoutes =
  require("./routes/userRoutes");

const bookmarkRoutes =
  require("./routes/bookmarkRoutes");

const commentRoutes =
  require(
    "./routes/commentRoutes"
  );


const app = express();

app.use(cors(
  {
    origin: "*"
  }
));
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/api/bookmarks",
  bookmarkRoutes
);

app.use(
  "/api/comments",
  commentRoutes
);

app.get("/", (req, res) => {
  res.send("AI Blog Platform API is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });