const dotEnv = require("dotenv");
dotEnv.config();
require("./config/db");
require("./utils/emailHelpers");
<<<<<<< HEAD

=======
>>>>>>> 35a0997ceba2a60fec13a93c9099d86a9c4766ee
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { apiRouter } = require("./api/v1/routes");

const app = express();

<<<<<<< HEAD
// Logging
app.use(morgan("dev"));

// ✅ CORS Configuration
const allowedOrigins = [
    "http://localhost:5173", // local dev
    "http://localhost:3000", // local dev (React default)
    "https://event-vault-nine.vercel.app", // deployed frontend
    process.env.FRONTEND_URL, // fallback from .env
].filter(Boolean); // remove undefined if FRONTEND_URL not set

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin like mobile apps or curl
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Allow cookies to be sent
    })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", apiRouter);

// Start server
app.listen(process.env.PORT || 5000, () => {
=======
app.use(morgan("dev")); // global middleware

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", apiRouter);

app.listen(process.env.PORT, () => {
>>>>>>> 35a0997ceba2a60fec13a93c9099d86a9c4766ee
    console.log("-------- Server started --------");
});
