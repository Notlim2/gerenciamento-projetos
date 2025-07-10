import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  text: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  title,
  text,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  const { t } = useTranslation("", { keyPrefix: "common" });

  function handleConfirm() {
    onConfirm();
    onClose();
  }

  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          {t("no")}
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          {t("yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
