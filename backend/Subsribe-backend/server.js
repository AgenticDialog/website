const express = require("express");
const cors = require("cors");
require("dotenv").config();

const emailRoutes = require("./routes/emailRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
