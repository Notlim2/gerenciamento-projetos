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
import type { Task } from "../../types/task";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../confirm-dialog";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";

interface TaskCardProps {
  task: Task;
  remove: (task: Task) => void;
}

export default function TaskCard({ task, remove }: TaskCardProps) {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const { t } = useTranslation("", { keyPrefix: "tasks" });
  const navigate = useNavigate();

  function editTask() {
    if (!task.id) {
      return;
    }
    navigate(`/tasks/edit/${task.id}`);
  }

  const done = useMemo(() => task.status === "COMPLETED", [task.status]);

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
              <Typography>{task.name}</Typography>
              {!!done && (
                <Avatar sx={{ background: green[500] }} aria-label="feito">
                  <CheckIcon />
                </Avatar>
              )}
              {/* TODO - FAZER PARA CANCELADO */}
            </Stack>
          }
          subheader={dayjs(task.createdAt).format("DD MMM YYYY ")}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {task.description}
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
            <IconButton aria-label="editar" color="primary" onClick={editTask}>
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
        onConfirm={() => remove(task)}
      />
    </>
  );
}
