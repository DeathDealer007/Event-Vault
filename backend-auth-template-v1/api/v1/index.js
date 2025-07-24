// api/v1/index.js

const express = require("express");
const router = express.Router();

const { eventRouter } = require("./event/eventRoutes"); // ✅ Correct destructuring

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/event", eventRouter); // ✅ Register event route

module.exports = router;
