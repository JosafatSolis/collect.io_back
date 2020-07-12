const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    // Gets id from token
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) return res.status(401).json({ error });
      // Once it has the id, finds the object in the DB and inserts it in the request
      User.findById(decoded.id).then((user) => {
        req.user = user;
        next();
      });
    });
  };