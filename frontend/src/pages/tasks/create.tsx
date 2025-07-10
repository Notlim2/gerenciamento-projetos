import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import type { TaskCreate } from "../../types/task";
import { useNavigate, useParams } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import axiosInstance from "../../http-client";
import { useTranslation } from "react-i18next";
import { AppTitle } from "../../components/app-title";
import { useForm, type SubmitHandler } from "react-hook-form";
import useSWR from "swr";

export function CreateTask() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("", { keyPrefix: "tasks.create" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskCreate>();

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

  async function create(url: string, { arg }: { arg: TaskCreate }) {
    const result = await axiosInstance.post(url, arg);
    return result.data;
  }

  function listTasks() {
    navigate(`/projects/${projectId}/tasks`);
  }

  const { trigger, isMutating, error } = useSWRMutation("/tasks", create);

  const submit: SubmitHandler<TaskCreate> = async (data) => {
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
            <AppTitle title={t("title", { name: project.name })} />
            <Grid container size={{ xs: 12 }} spacing={1}>
              {!!error && (
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
