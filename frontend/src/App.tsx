import Container from "@mui/material/Container";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppHeader } from "./components/app-header";

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Container>
        <AppRoutes />
      </Container>
    </BrowserRouter>
  );
}

export default App;
