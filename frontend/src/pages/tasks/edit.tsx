import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import type { TaskStatus, TaskUpdate } from "../../types/task";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import axiosInstance from "../../http-client";
import { useTranslation } from "react-i18next";
import { AppTitle } from "../../components/app-title";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import useSWR from "swr";
import Typography from "@mui/material/Typography";

const TASK_STATUS: { key: TaskStatus; name: string }[] = [
  { key: "PENDING", name: "status.options.pending" },
  { key: "IN_PROGRESS", name: "status.options.inProgress" },
  { key: "BLOCKED", name: "status.options.blocked" },
  { key: "CANCELED", name: "status.options.canceled" },
  { key: "COMPLETED", name: "status.options.completed" },
];

export function EditTask() {
  const { projectId, id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("", { keyPrefix: "tasks.edit" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TaskUpdate>();

  async function projectFetcher({ url, id }: { url: string; id: string }) {
    if (!id) {
      return undefined;
    }
    const result = await axiosInstance.get(`${url}/${id}`);
    return result.data;
  }

  const {
    data: project,
    isLoading: isLoadingProject,
    error: errorProject,
  } = useSWR({ url: "/projects", id: projectId }, projectFetcher);

  const fetcher = async ({ url, id }: { url: string; id: string }) => {
    const result = await axiosInstance.get(`${url}/${id}`);
    return result.data;
  };

  const {
    data: task,
    isLoading,
    error,
  } = useSWR({ url: "tasks", id }, fetcher);

  function listTasks() {
    navigate(`/projects/${projectId}/tasks`);
  }

  async function update(url: string, { arg }: { arg: TaskUpdate }) {
    const result = await axiosInstance.put(`${url}/${id}`, {
      ...arg,
      projectId,
    });
    return result.data;
  }

  const {
    trigger,
    isMutating,
    error: submitError,
  } = useSWRMutation("/tasks", update);

  const submit: SubmitHandler<TaskUpdate> = async (data) => {
    await trigger(data);
    listTasks();
  };

  useEffect(() => {
    if (!projectId) {
      return;
    }
    reset({
      projectId: +projectId,
    });
  }, [projectId, reset]);

  useEffect(() => {
    if (!task) {
      return;
    }
    reset({
      name: task.name,
      description: task.description,
      status: task.status,
    });
  }, [reset, task]);

  return (
    <>
      <Grid container spacing={1}>
        {isLoading || isLoadingProject ? (
          <Grid size={{ xs: 12 }}>
            <Stack justifyContent="center" alignItems="center">
              <CircularProgress />
            </Stack>
          </Grid>
        ) : errorProject ? (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">{t("error.project")}</Alert>
          </Grid>
        ) : error ? (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">{t("error.task")}</Alert>
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
                <MuiLink component={RouterLink} to="/tasks" underline="hover">
                  {t("tasks")}
                </MuiLink>
                <Typography>{task.name}</Typography>
              </Breadcrumbs>
            </Grid>
            <AppTitle title={t("title", { name: project.name })} />
            <Grid container size={{ xs: 12 }} spacing={1}>
              {!!submitError && (
                <Grid size={{ xs: 12 }}>
                  <Alert severity="error">{t("error.submit")}</Alert>
                </Grid>
              )}
              <Grid size={{ xs: 12 }}>
                <form onSubmit={handleSubmit(submit)}>
                  <Grid container size={{ xs: 12 }} spacing={1}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        {...register("name", {
                          required: t("name.errors.required"),
                        })}
                        variant="filled"
                        label={t("name.label")}
                        helperText={errors.name?.message}
                        error={!!errors.name}
                        sx={{ background: "white" }}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        {...register("description")}
                        variant="filled"
                        label={t("description.label")}
                        sx={{ background: "white" }}
                        rows={3}
                        multiline
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FormControl variant="filled" fullWidth>
                        <InputLabel id="task_status">
                          {t("status.label")}
                        </InputLabel>
                        <Controller
                          render={({ field }) => {
                            return (
                              <Select
                                labelId="task_status"
                                label={t("status.label")}
                                sx={{ background: "white" }}
                                {...field}
                              >
                                {TASK_STATUS.map((s) => (
                                  <MenuItem key={s.key} value={s.key}>
                                    {t(s.name)}
                                  </MenuItem>
                                ))}
                              </Select>
                            );
                          }}
                          name="status"
                          control={control}
                          defaultValue="PENDING"
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="end"
                        spacing={1}
                      >
                        <Button
                          variant="contained"
                          color="error"
                          type="button"
                          onClick={listTasks}
                          loading={isMutating}
                        >
                          {t("buttons.cancel")}
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          type="submit"
                          loading={isMutating}
                        >
                          {t("buttons.confirm")}
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
