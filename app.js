const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");

const emailRoutes = require("./routes/emailRoutes");
const mailRoutes = require("./routes/formRoutes");


app.use(express.json());
app.use(cors());

// Set the port
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a "Hello World" API endpoint
// app.get('/api/helloworld', (req, res) => {
//   res.json({ message: 'Hello World' });
// });

// app.use("/api", mailRoutes);
app.use("/api/email", emailRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
