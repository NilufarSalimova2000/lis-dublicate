import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import { colors } from "../../mui-config/colors";
import { Link, useLocation } from "react-router-dom";
import { AlignJustify, Bell } from "lucide-react";
import logoMobile from "../../assets/images/logo-tablet.svg";
import { useState } from "react";
import { SidebarMobile } from "../sidebar-mobile";

export const Header = () => {
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);

  const pageTitle: Record<string, string> = {
    "/": "Dashboard",
    "/users": "Employees",
    "/appointment/patients": "Patients",
    "/appointment/wfa": "Waiting for admission",
    "/nurse/patients": "Orders",
    "/nurse/journal": "Nurse worksheets",
    "/warehouse": "Warehouse",
    "/create": "Create user",
    "/appointment/create": "Create patient"
  };

  const currentTitle = pageTitle[location.pathname] || "";
  const userStr = localStorage.getItem("user");
  const organizationStr = localStorage.getItem("organization");

  const user = userStr ? JSON.parse(userStr) : null;
  const organization = organizationStr ? JSON.parse(organizationStr) : null;
  return (
    <Box
      position={"sticky"}
      top={0}
      zIndex={20}
      bgcolor={{ sm: `${colors.creamBg}`, xs: `${colors.pureWhite}` }}
      padding={{ sm: "28px", xs: "16px" }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display={{ xs: "block", sm: "none" }}>
          <Link to={"/"}>
            <img src={logoMobile} alt="logo" />
          </Link>
        </Box>
        <Typography
          fontSize={{ xs: "16px", sm: "20px", md: "22px" }}
          variant="h5"
        >
          {currentTitle}
        </Typography>

        <Stack
          display={{ xs: "none", sm: "flex" }}
          direction={"row"}
          gap={"12px"}
          alignItems={"center"}
        >
          <Box
            width={"40px"}
            height={"40px"}
            borderRadius={"12px"}
            bgcolor={colors.pureWhite}
            padding={"9px"}
          >
            <Bell />
          </Box>
          <Stack>
            <Typography fontSize={"16px"} variant="h6">
              {user?.fullName || "User"}
            </Typography>
            <Typography fontWeight={"500"} fontSize={"14px"} variant="h6">
              {organization?.name || "Organization"}
            </Typography>
          </Stack>
        </Stack>

        <Button
          sx={{
            color: `${colors.gray20}`,
            display: { xs: "block", sm: "none" },
            padding: "0",
          }}
          onClick={() => setOpenDrawer(true)}
        >
          <AlignJustify />
        </Button>
      </Stack>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            width: "220px",
            padding: "16px",
          },
        }}
      >
        <SidebarMobile onClose={() => setOpenDrawer(false)} />{" "}
      </Drawer>
    </Box>
  );
};
