import type { ProjectUpdate } from "../../types/project";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { AppTitle } from "../../components/app-title";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import axiosInstance from "../../http-client";
import useSWR from "swr";
import { useEffect } from "react";

export function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("", { keyPrefix: "projects.edit" });

  async function getProject({ url, id }: { url: string; id: number }) {
    const result = await axiosInstance.get(`${url}/${id}`);
    return result.data;
  }

  const {
    data: project,
    isLoading,
    error: getProjectError,
  } = useSWR({ url: "/projects", id }, getProject);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectUpdate>();

  async function create(url: string, { arg }: { arg: ProjectUpdate }) {
    const result = await axiosInstance.put(`${url}/${id}`, arg);
    return result.data;
  }

  const { trigger, isMutating, error } = useSWRMutation(
    "/projects",
    create,
    {}
  );

  const submit: SubmitHandler<ProjectUpdate> = (data) => {
    trigger(data);
  };

  function listProjects() {
    navigate("/projects");
  }

  useEffect(() => {
    if (!project) {
      return;
    }
    reset({ name: project.name, description: project.description });
  }, [project, reset]);

  return (
    <>
      <Grid container spacing={1}>
        <AppTitle title={t("title")} />
        <Grid container size={{ xs: 12 }} spacing={1}>
          {!!error && (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error">{t("error.submit")}</Alert>
            </Grid>
          )}
          {!!getProjectError && (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error">{t("error.get")}</Alert>
            </Grid>
          )}
          {isLoading ? (
            <Stack alignItems="center" justifyContent="center">
              <CircularProgress />
            </Stack>
          ) : (
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
                        onClick={listProjects}
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
          )}
        </Grid>
      </Grid>
    </>
  );
}
