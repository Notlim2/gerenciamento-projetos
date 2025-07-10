import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import ReactCountryFlag from "react-country-flag";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";

const LANGUAGES = [
  { code: "pt", label: "Português", flag: "BR" },
  { code: "en", label: "English", flag: "US" },
  { code: "es", label: "Español", flag: "ES" },
];

export function AppHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t, i18n } = useTranslation("", { keyPrefix: "header" });
  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <>
      <AppBar position="fixed">
        <Grid
          container
          size={{ xs: 12 }}
          sx={{ padding: theme.spacing(1, 2) }}
          alignItems="center"
        >
          <Grid size={{ xs: 10, sm: 8 }}>
            <Typography
              variant="h1"
              fontSize={{ xs: theme.spacing(2.5), sm: theme.spacing(3) }}
            >
              {t("title")}
            </Typography>
          </Grid>
          <Grid size={{ xs: 2, sm: 4 }}>
            <Stack direction="row" justifyContent="end">
              <Select
                value={currentLang.code}
                onChange={handleChangeLanguage}
                size="small"
                sx={{ background: "white" }}
              >
                {LANGUAGES.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <ReactCountryFlag
                        countryCode={lang.flag}
                        svg
                        style={{ width: "1.5em", height: "1.5em" }}
                      />
                      {!isMobile && <Typography>{lang.label}</Typography>}
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>
        </Grid>
      </AppBar>
      <Box sx={{ height: theme.spacing(7) }}></Box>
    </>
  );
}
