const { handleGenericAPIError } = require("../../utils/controllerHelpers");
const jwt = require("jsonwebtoken");

const ADMIN_EMAIL = "ankit19kumar2004@gmail.com";

// Middleware to verify token and extract user info
const userAuthenticationMiddleware = (req, res, next) => {
  console.log("--> inside userAuthenticationMiddleware");
  try {
    const { authorization } = req.cookies;
    console.log("--> authorization", authorization);
    if (!authorization) {
      return res.status(401).json({
        isSuccess: false,
        message: "Token not found!",
      });
    }

    jwt.verify(
      authorization,
      process.env.JWT_SECRET,
      function (err, decodedData) {
        if (err) {
          return res.status(401).json({
            isSuccess: false,
            message: "Invalid token!",
            data: {},
          });
        } else {
          req.user = decodedData; // decodedData contains userId (and optionally email if added to token)
          next();
        }
      }
    );
  } catch (err) {
    handleGenericAPIError("userAuthenticationMiddleware", req, res, err);
  }
};

// Admin-only middleware
const isAdminMiddleware = (req, res, next) => {
  console.log("--> inside isAdminMiddleware");
  try {
    const { email } = req.user;
    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({
        isSuccess: false,
        message: "Unauthorized: Admin access only",
        data: {},
      });
    }
    next();
  } catch (err) {
    handleGenericAPIError("isAdminMiddleware", req, res, err);
  }
};

module.exports = {
  userAuthenticationMiddleware,
  isAdminMiddleware,
};
