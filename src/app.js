import express from "express";
import cors from "cors";
import moviesRouter from "./routes/movies.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);

export default app;
