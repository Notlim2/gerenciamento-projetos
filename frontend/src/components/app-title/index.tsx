import type React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface AppTitleProps {
  title: React.ReactNode;
}

export function AppTitle({ title }: AppTitleProps) {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h2">{title}</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Divider />
      </Grid>
    </>
  );
}
