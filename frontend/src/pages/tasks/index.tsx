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
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import TaskCard from "../../components/task-card";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "../../http-client";
import { useDebounce } from "use-debounce";
import type { Task } from "../../types/task";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { AppTitle } from "../../components/app-title";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 12;
const DEBOUNCE_TIMEOUT = 500;

export function Tasks() {
  const { t } = useTranslation("", { keyPrefix: "tasks.list" });
  const { projectId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [lastRemovedTask, setLastRemovedTask] = useState<Task>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, DEBOUNCE_TIMEOUT);

  async function projectFetcher({ url, id }: { url: string; id: string }) {
    if (!id) {
      return undefined;
    }
    const result = await axios.get(`${url}/${id}`);
    return result.data;
  }

  const {
    data: project,
    isLoading: isLoadingProject,
    error: errorProject,
  } = useSWR({ url: "/projects", id: projectId }, projectFetcher);

  const fetcher = async ({
    projectId,
    url,
    search,
    page,
  }: {
    projectId: number;
    url: string;
    search: string;
    page: number;
  }) => {
    if (!projectId) {
      throw new Error(t("error.projectIdNotFound"));
    }
    return axios
      .get(url, {
        params: {
          projectId,
          search,
          skip: (page - 1) * ITEMS_PER_PAGE,
          take: ITEMS_PER_PAGE,
        },
      })
      .then((r) => r.data);
  };

  const { data, isLoading, error, mutate } = useSWR(
    { projectId, page, search: debouncedSearch, url: "/tasks" },
    fetcher,
    { revalidateOnFocus: false }
  );

  const tasks = useMemo(() => {
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

  function addTask() {
    navigate(`/projects/${projectId}/tasks/create`);
  }

  async function remove(url: string, { arg }: { arg: Task }) {
    const result = await axios.delete(`${url}/${arg.id}`);
    return result.data;
  }

  const {
    error: errorOnDeleteTask,
    isMutating,
    trigger: removeTask,
  } = useSWRMutation("/tasks", remove);

  async function handleRemoveTask(task: Task) {
    await removeTask(task);
    setLastRemovedTask(task);
    mutate();
  }

  return (
    <>
      <Grid container spacing={1}>
        {isLoadingProject ? (
          <Grid size={{ xs: 12 }}>
            <Stack justifyContent="center" alignItems="center">
              <CircularProgress />
            </Stack>
          </Grid>
        ) : errorProject ? (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">{t("error.project")}</Alert>
          </Grid>
        ) : !project ? (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">{t("error.projectNotFound")}</Alert>
          </Grid>
        ) : (
          <>
            <Grid size={{ xs: 12 }}>
              <Breadcrumbs>
                <MuiLink
                  component={RouterLink}
                  to="/projects"
                  underline="hover"
                >
                  {t("projects")}
                </MuiLink>
                <Typography>{project.name}</Typography>
                <Typography>{t("tasks")}</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>
            <AppTitle title={t("title", { name: project.name })} />
            <Grid container size={{ xs: 12 }} spacing={1}>
              <Grid size={{ xs: 9, sm: 10 }}>
                <TextField
                  variant="filled"
                  label={t("filters.search.label")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ background: "white" }}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 3, sm: 2 }}>
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
            {lastRemovedTask && (
              <Grid size={{ xs: 12 }}>
                <Alert severity="success">
                  {t("success.delete", { name: lastRemovedTask.name })}
                </Alert>
              </Grid>
            )}
            {errorOnDeleteTask && (
              <Grid size={{ xs: 12 }}>
                <Alert severity="error">{t("error.delete")}</Alert>
              </Grid>
            )}
            <Grid container size={{ xs: 12 }} spacing={1}>
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
              ) : !tasks.length ? (
                <Grid size={{ xs: 12 }}>
                  <Typography>{t("alert.notFoundForFilter")}</Typography>
                </Grid>
              ) : (
                <>
                  {tasks.map((p: Task) => (
                    <Grid size={{ xs: 12, md: 2, lg: 3 }}>
                      <TaskCard key={p.id} task={p} remove={handleRemoveTask} />
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
          </>
        )}
      </Grid>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        }}
        onClick={addTask}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
