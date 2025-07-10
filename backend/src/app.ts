import express from "express";
import cors from "cors";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

export default app;
