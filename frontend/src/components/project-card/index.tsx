import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import dayjs from "dayjs";
import type { Project } from "../../types/project";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../confirm-dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";

interface ProjectCardProps {
  project: Project;
  remove: (project: Project) => void;
}

export default function ProjectCard({ project, remove }: ProjectCardProps) {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const { t } = useTranslation("", { keyPrefix: "projects" });
  const navigate = useNavigate();

  function editProject() {
    if (!project.id) {
      return;
    }
    navigate(`/projects/edit/${project.id}`);
  }

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>{project.name}</Typography>
              {!!project.done && (
                <Avatar sx={{ background: green[500] }} aria-label="feito">
                  <CheckIcon />
                </Avatar>
              )}
            </Stack>
          }
          subheader={dayjs(project.createdAt).format("DD MMM YYYY ")}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {project.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title={t("list.card.remove")}>
            <IconButton
              aria-label="excluir"
              color="error"
              onClick={() => setRemoveDialogOpen(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("list.card.edit")}>
            <IconButton
              aria-label="editar"
              color="primary"
              onClick={editProject}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <ConfirmDialog
        open={removeDialogOpen}
        onClose={() => setRemoveDialogOpen(false)}
        title={t("remove.title")}
        text={t("remove.text")}
        onConfirm={() => remove(project)}
      />
    </>
  );
}
