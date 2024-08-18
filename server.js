import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import bookRoutes from "./routes/bookRoute.js"
import semesterRoutes from "./routes/semesterRoutes.js";
import cors from 'cors';
import path from 'path';

//configure env
dotenv.config({ path: "configenv/.env" });

//databse config
connectDB();

//rest object
const app = express();

const __dirname = path.resolve();
console.log(__dirname);

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/semester", semesterRoutes);
app.use("/api/v1/book", bookRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 5000;
// const PORT = 5000;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});