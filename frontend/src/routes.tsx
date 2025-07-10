import { Navigate, Route, Routes } from "react-router-dom";
import { Projects } from "./pages/projects";
import { CreateProject } from "./pages/projects/create";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/create" element={<CreateProject />} />
    </Routes>
  );
}
