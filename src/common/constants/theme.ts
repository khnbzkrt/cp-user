"use client";

import { createTheme } from "@mui/material";

const CONTAINER_BG_LIGHT = "#F8F8F8";
const CONTAINER_BG_DARK = "#222222";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    dark: {
      palette: {
        background: {
          container: CONTAINER_BG_DARK,
        },
      },
    },
    light: {
      palette: {
        background: {
          container: CONTAINER_BG_LIGHT,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
