require("dotenv").config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY || "secreto123",
  TOKEN_EXPIRES_IN: "1h",
  ROLES: ["administrador", "auditor", "supervisor", "trabajador"]
};

  