import { useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Fab from "@mui/material/Fab";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ProjectCard from "../../components/project-card";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "../../http-client";
import { useDebounce } from "use-debounce";
import type { Project } from "../../types/project";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AppTitle } from "../../components/app-title";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 12;
const DEBOUNCE_TIMEOUT = 500;

export function Projects() {
  const { t } = useTranslation("", { keyPrefix: "projects.list" });
  const navigate = useNavigate();
  const theme = useTheme();
  const [lastRemovedProject, setLastRemovedProject] = useState<Project>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, DEBOUNCE_TIMEOUT);

  const fetcher = async ({
    url,
    search,
    page,
  }: {
    url: string;
    search: string;
    page: number;
  }) => {
    return axios
      .get(url, {
        params: {
          search,
          skip: (page - 1) * ITEMS_PER_PAGE,
          take: ITEMS_PER_PAGE,
        },
      })
      .then((r) => r.data);
  };

  const { data, isLoading, error, mutate } = useSWR(
    { page, search: debouncedSearch, url: "/projects" },
    fetcher,
    { revalidateOnFocus: false }
  );

  const projects = useMemo(() => {
    if (!data || !data.items) {
      return [];
    }
    return data.items;
  }, [data]);

  const count = useMemo(() => {
    if (!data || !data.count) {
      return 0;
    }
    return data.count;
  }, [data]);

  function addProject() {
    navigate("/projects/create");
  }

  async function remove(url: string, { arg }: { arg: Project }) {
    const result = await axios.delete(`${url}/${arg.id}`);
    return result.data;
  }

  const {
    error: errorOnDeleteProject,
    isMutating,
    trigger: removeProject,
  } = useSWRMutation("/projects", remove);

  async function handleRemoveProject(project: Project) {
    await removeProject(project);
    setLastRemovedProject(project);
    mutate();
  }

  return (
    <>
      <Grid container spacing={1}>
        <AppTitle title={t("title")} />
        <Grid container size={{ xs: 12 }}>
          <Grid size={{ xs: 12, sm: 10 }}>
            <TextField
              variant="filled"
              label={t("filters.search.label")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ background: "white" }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ height: "100%" }}
              onClick={mutate}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Divider />
        </Grid>
        {lastRemovedProject && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="success">
              {t("success.delete", { name: lastRemovedProject.name })}
            </Alert>
          </Grid>
        )}
        {errorOnDeleteProject && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">{t("error.delete")}</Alert>
          </Grid>
        )}
        <Grid container size={{ xs: 12 }}>
          {isMutating || isLoading ? (
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
              <Alert severity="error">{t("error.list")}</Alert>
            </Grid>
          ) : !projects.length ? (
            <Grid size={{ xs: 12 }}>
              <Typography>{t("alert.notFoundForFilter")}</Typography>
            </Grid>
          ) : (
            <>
              {projects.map((p: Project) => (
                <Grid size={{ xs: 12, md: 2, lg: 3 }}>
                  <ProjectCard
                    key={p.id}
                    project={p}
                    remove={handleRemoveProject}
                  />
                </Grid>
              ))}
              <Grid size={{ xs: 12 }}>
                <Pagination
                  page={page}
                  onChange={(_, newPage) => setPage(newPage)}
                  count={Math.ceil(count / ITEMS_PER_PAGE)}
                  color="primary"
                />
              </Grid>
            </>
          )}
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
