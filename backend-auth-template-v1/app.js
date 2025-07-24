const dotEnv = require("dotenv");
dotEnv.config();

require("./config/db");
require("./utils/emailHelpers");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const apiRouter = require("./api/v1"); // ✅ FIXED import

const app = express();

// Logging
app.use(morgan("dev"));

// ✅ CORS Configuration
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // Allow curl, mobile
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", apiRouter); // ✅ now works properly

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`-------- Server started on port ${PORT} --------`);
});
