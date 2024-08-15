const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

async function userMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      console.log("incorrect token or missing ");
      return res.status(404).json({
        message: "Your token seems to be incorrect",
      });
    }
    const jwtToken = token.split(" ")[1];
    const decoded = jwt.verify(jwtToken, JWT_SECRET);

    if (decoded) {
      console.log(decoded);
      req.user_id = decoded.user_id;
      console.log("Middleware set req._id:", req.user_id);
      next();
    } else {
      res.status(403).json({
        message: " You are not authenticated",
      });
    }
  } catch (err) {
    res.status(400).json({ messgae: "something's up with our server" });
    console.log(err);
  }
}

module.exports = userMiddleware;
