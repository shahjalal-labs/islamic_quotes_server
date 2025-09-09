import jwt from "jsonwebtoken";
import httpStatus from "http-status";

const verifyJWT = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token)
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Unauthorized:No token provided",
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: "Forbidden:Invalid token",
        error: process.env.NODE_ENV !== "production" && err,
      });

    req.decoded = decoded;
    next();
  });
};

export default verifyJWT;
