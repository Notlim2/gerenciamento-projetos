import type { ProjectCreate } from "../../types/project";
import Grid from "@mui/material/Grid";
import { AppTitle } from "../../components/app-title";
import { useForm, type SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import useSWRMutation from "swr/mutation";
import axiosInstance from "../../http-client";
import Alert from "@mui/material/Alert";

export function CreateProject() {
  const navigate = useNavigate();
  const { t } = useTranslation("", { keyPrefix: "projects.create" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectCreate>();

  async function create(url: string, { arg }: { arg: ProjectCreate }) {
    const result = await axiosInstance.post(url, arg);
    return result.data;
  }

  const { trigger, isMutating, error } = useSWRMutation("/projects", create);

  const submit: SubmitHandler<ProjectCreate> = async (data) => {
    await trigger(data);
    navigate("/projects");
  };

  function listProjects() {
    navigate("/projects");
  }

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
        </Grid>
      </Grid>
    </>
  );
}
