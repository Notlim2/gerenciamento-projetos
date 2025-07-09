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

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
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
        <IconButton aria-label="excluir" color="error">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="editar" color="primary">
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
