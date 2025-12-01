import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

// DB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Recipe Sharing Platform API");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
