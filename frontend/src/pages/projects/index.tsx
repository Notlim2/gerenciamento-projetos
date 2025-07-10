import { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Fab from "@mui/material/Fab";
import ProjectCard from "../../components/project-card";
import useSWR from "swr";
import axios from "../../http-client";
import { useDebounce } from "use-debounce";
import type { Project } from "../../types/project";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AppTitle } from "../../components/app-title";

const DEBOUNCE_TIMEOUT = 500;

export function Projects() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, DEBOUNCE_TIMEOUT);

  const fetcher = async ({ url, search }: { url: string; search: string }) => {
    return axios.get(url, { params: { search } }).then((r) => r.data);
  };

  const {
    data: projects,
    isLoading,
    error,
  } = useSWR({ search: debouncedSearch, url: "/projects" }, fetcher);

  function addProject() {
    navigate("/projects/create");
  }

  return (
    <>
      <Grid container spacing={1}>
        <AppTitle title="Projetos" />
        <Grid container size={{ xs: 12 }}>
          <Grid size={{ xs: 12, sm: 10 }}>
            <TextField
              variant="filled"
              label="Pesquisar..."
              value={debouncedSearch}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ background: "white" }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Button variant="contained" fullWidth sx={{ height: "100%" }}>
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid container size={{ xs: 12 }}>
          {isLoading ? (
            <Grid size={{ xs: 12 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress />
              </Stack>
            </Grid>
          ) : error ? (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error">
                Houve um erro ao listar os projetos. Tente novamente mais tarde!
              </Alert>
            </Grid>
          ) : (
            projects.map((p: Project) => (
              <Grid size={{ xs: 12, md: 2, lg: 3 }}>
                <ProjectCard key={p.id} project={p} />
              </Grid>
            ))
          )}
          {/* TODO - PAGINAÇÃO */}
        </Grid>
      </Grid>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        }}
        onClick={addProject}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
