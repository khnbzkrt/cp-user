import { AppTheme } from "@toolpad/core";

declare module "@mui/material/styles" {
  interface Theme extends AppTheme {
    colorSchemes: {
      dark: {
        palette: {
          background: {
            container: string;
          };
        };
      };
      light: {
        palette: {
          background: {
            container: string;
          };
        };
      };
    };
  }
  interface ThemeOptions {
    colorSchemes: {
      dark: {
        palette: {
          background: {
            container: string;
          };
        };
      };
      light: {
        palette: {
          background: {
            container: string;
          };
        };
      };
    };
  }
}
