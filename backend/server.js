const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.use("/user", userRoutes);

app.use("/task", taskRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});