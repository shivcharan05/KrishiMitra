const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

const weatherRoutes = require("./routes/weatherRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const soilRoutes = require("./routes/soilRoutes");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");

app.use("/api/weather", weatherRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/soil", soilRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("KrishiMitra API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
