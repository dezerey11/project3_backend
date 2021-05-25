require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    // Authorization: "bearer [token goes here]"
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, SECRET);
      if (payload) {
        req.payload = payload;
        next();
      } else {
        res.status(400).json({ error: "VERIFICATION FAILED OR NO PAYLOAD" });
      }
    } else {
      res.status(400).json({ error: "NO AUTHORIZATION HEADER" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = auth;
