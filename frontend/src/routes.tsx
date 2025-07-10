import { Navigate, Route, Routes } from "react-router-dom";
import { Projects } from "./pages/projects";
import { CreateProject } from "./pages/projects/create";
import { EditProject } from "./pages/projects/edit";
import { Tasks } from "./pages/tasks";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/create" element={<CreateProject />} />
      <Route path="/projects/edit/:id" element={<EditProject />} />
      <Route path="/projects/:projectId/tasks" element={<Tasks />} />
    </Routes>
  );
}
