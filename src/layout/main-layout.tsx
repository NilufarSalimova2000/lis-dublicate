import { Box, Stack } from "@mui/material";
import { Sidebar } from "../widgets/sidebar";
import { Header } from "../widgets/header";
import { Navigate, Outlet } from "react-router-dom";
import { colors } from "../mui-config/colors";
import Cookies from "js-cookie";

export const MainLayout = () => {
  const token = Cookies.get("access_token");
  if (!token) {
    return <Navigate replace to={"/login"} />;
  }
  return (
    <Box overflow="hidden">
      <Stack direction="row" height="100%">
        <Box
          display={{ xs: "none", sm: "block" }}
          height={"100vh"}
          overflow={"auto"}
        >
          <Sidebar />
        </Box>
        <Stack
          overflow={"auto"}
          flex={1}
          bgcolor={colors.creamBg}
          height="100vh"
        >
          <Header />
          <Box flex={1}>
            <Outlet />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
