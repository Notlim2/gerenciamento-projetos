import Container from "@mui/material/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Projects } from "./pages/projects";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="" element={<Projects />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
