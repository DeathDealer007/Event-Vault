// api/v1/index.js

const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/event", require("./event/eventRoutes")); // ✅ Register event route

module.exports = router;