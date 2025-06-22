import { createTheme } from "@mui/material";
import { colors } from "./colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#C2E66E",
      contrastText: "#272932",
      dark: "",
      light: "#DFF9A2",
    },
    secondary: {
      main: "#FFBE8A",
      contrastText: "#272932",
      dark: "#FFA257",
      light: "#FFE1C9",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(),
    h1: {
      fontWeight: 600,
      fontSize: "32px",
      color: `${colors.black}`,
    },
    h2: {
      fontWeight: 600,
      fontSize: "28px",
      color: `${colors.black}`,
    },
    h3: {
      fontWeight: 600,
      fontSize: "26px",
      color: `${colors.black}`,
    },
    h4: {
      fontWeight: 600,
      fontSize: "24px",
      color: `${colors.black}`,
    },
    h5: {
      fontWeight: 600,
      fontSize: "22px",
      color: `${colors.black}`,
    },
    h6: {
      fontWeight: 600,
      fontSize: "20px",
      color: `${colors.black}`,
    },
    body1: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "140%",
      color: `${colors.black}`,
    },
    body2: {
      fontWeight: 400,
      fontSize: "14px",
      color: `${colors.black}`,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 520,
      md: 800,
      lg: 1100,
      xl: 1400,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundColor: `${colors.grayLine}`,
          border: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: colors.grayBg,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          maxWidth: "100%",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: colors.grayBg,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: 500,
          textTransform: "capitalize",
        },
      },
    },
  },
});
