import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Inter", sans-serif`,
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:focus, &:focus-visible": {
            outline: "none",
            // backgroundColor: "transparent",
          },
          "&:hover": {
            // backgroundColor: "transparent",
          },
          "&:active": {
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus, &:focus-visible": {
            outline: "none",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus, &:focus-visible": {
            outline: "none",
          },
        },
      },
    },
  },
});

export default theme;
