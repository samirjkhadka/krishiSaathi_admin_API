const { start } = require("repl");
const app = require("./app");
const connectMongo = require("./src/config/mongo");
const postgres = require("./src/config/postgres");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // await pool();
  await connectMongo();
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

// Start the server
startServer();
