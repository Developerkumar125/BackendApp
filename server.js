const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
// Create a proxy middleware
const apiProxy = createProxyMiddleware("/api", {
  target: "https://schoolapp-y6um.onrender.com/", // Replace with the API endpoint URL
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // Remove the '/api' path prefix from the request
  },
});

app.use("/api", apiProxy);
// Enable CORS

// Parse requests with JSON payload
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Include the tutorial routes
require("./app/routes/turorial.routes")(app);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("404: Page not found");
});

// Set the port and start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
