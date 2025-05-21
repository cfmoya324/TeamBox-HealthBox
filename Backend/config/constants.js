require("dotenv").config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY || "",
  TOKEN_EXPIRES_IN: "1h",
  ROLES: ["administrador", "auditor", "supervisor", "trabajador"]
};
