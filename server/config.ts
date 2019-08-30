import dotenv from "dotenv";

dotenv.config();

module.exports = {
  api_key: process.env.API_KEY,
  port: process.env.PORT
};
