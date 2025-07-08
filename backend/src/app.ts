import express from "express";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(express.json());
app.use("/projects", projectRoutes);
app.use("/task", taskRoutes);

export default app;
