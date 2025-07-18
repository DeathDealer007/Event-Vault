const express = require("express");
const { authRouter } = require("./auth/routes");
const { usersRouter } = require("./users/routes");
const { eventRouter } = require("./event/eventRoutes"); // ✅ Import eventRouter
const { userAuthenticationMiddleware } = require("./middleware");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter); // public route

apiRouter.use(userAuthenticationMiddleware); // ✅ protected routes below

apiRouter.use("/users", usersRouter);
apiRouter.use("/event", eventRouter); // ✅ Register /api/v1/event route

module.exports = { apiRouter };
