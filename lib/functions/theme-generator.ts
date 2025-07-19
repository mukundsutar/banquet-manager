import { createTheme, type ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#6e2559",
    },
  },
};

export const theme = createTheme(themeOptions);
