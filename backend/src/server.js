const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

const weatherRoutes = require(
  "./routes/weatherRoutes"
);

app.get("/", (req, res) => {
  res.send("KrishiMitra  API Running");
});

const testRoutes = require("./routes/testRoutes");


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const chatbotRoutes = require(
  "./routes/chatbotRoutes"
);


app.use(
  "/api/weather",
  weatherRoutes
);

app.use("/api/test", testRoutes);

app.use(
  "/api/chatbot",
  chatbotRoutes
);