import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Collapse,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/images/Logo.svg";
import logoTablet from "../../assets/images/logo-tablet.svg";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  Coffee,
  FlaskConical,
  Hospital,
  LayoutDashboard,
  ListIcon,
  NotepadText,
  ShieldPlus,
  User,
  UserPlus,
  Users,
  Warehouse,
} from "lucide-react";
import { Logout } from "../../components/logout";
import { colors } from "../../mui-config/colors";

export const navItems = [
  { icon: <LayoutDashboard />, label: "Dashboard", path: "/" },
  {
    icon: <ShieldPlus />,
    label: "Admission",
    children: [
      { icon: <UserPlus />, label: "Patients", path: "/appointment/patients" },
      {
        icon: <Coffee />,
        label: "Waiting for admission",
        path: "/appointment/wfa",
      },
    ],
  },
  { icon: <Users />, label: "Employees", path: "/users" },
  {
    icon: <Hospital />,
    label: "Fence cabinet",
    children: [
      { icon: <ListIcon />, label: "Orders", path: "/nurse/patients" },
      { icon: <NotepadText />, label: "My worksheets", path: "/nurse/journal" },
    ],
  },
  {
    icon: <FlaskConical />,
    label: "Laboratory",
    children: [
      { icon: <ListIcon />, label: "Research", path: "/labrant/patients" },
      { icon: <ListIcon />, label: "Incoming worksheets", path: "/labrant/tube-list" },
      { icon: <NotepadText />, label: "My worksheets", path: "/labrant/journal" },
    ],
  },
  {
    icon: <Calculator />,
    label: "Cash register",
    children: [
      { icon: <User />, label: "Patients", path: "/cashier/patients" },
    ],
  },
  {
    icon: <Warehouse />,
    label: "Warehouse",
    children: [
      { icon: <ListIcon />, label: "List of products", path: "/warehouse" },
    ],
  },
];

export const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const handleToggle = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const location = useLocation();
  const isParentActive = (children: any) => {
    for (let i = 0; i < children.length; i++) {
      if (location.pathname === children[i].path) return true;
    }
    return false;
  };

  return (
    <Box
      width={{ md: "250px", sm: "76px" }}
      bgcolor={colors.pureWhite}
      padding={"28px 20px"}
      height={"100vh"}
      overflow={"auto"}
      display="flex"
      flexDirection="column"
    >
      <Box mb={"28px"}>
        <Box display={{ md: "block", sm: "none" }}>
          <NavLink to="/">
            <img src={Logo} alt="logo" />
          </NavLink>
        </Box>
        <Box display={{ md: "none", sm: "block" }}>
          <NavLink to="/">
            <img src={logoTablet} alt="logo" />
          </NavLink>
        </Box>
      </Box>

      <Stack
        height={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
      >
        <List>
          {navItems.map((item) => (
            <Box key={item.label}>
              {item.children ? (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleToggle(item.label)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { md: "12px" },
                        justifyContent: { sm: "center" },
                        padding: { md: "10px 16px" },
                        mb: "8px",
                        bgcolor:
                          item.children && isParentActive(item.children)
                            ? colors.primary
                            : "transparent",
                        color:
                          item.children && isParentActive(item.children)
                            ? colors.black
                            : colors.gray20,
                        borderRadius:
                          item.children && isParentActive(item.children)
                            ? "14px"
                            : "none",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: "inherit",
                          minWidth: "auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "20px",
                          height: "20px",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ display: { xs: "none", md: "block" } }}
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      />
                      {openMenus[item.label] ? (
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                          <ChevronUp />
                        </Box>
                      ) : (
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                          <ChevronDown />
                        </Box>
                      )}
                    </ListItemButton>
                  </ListItem>

                  <Collapse
                    in={openMenus[item.label]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItem key={child.label} disablePadding>
                          <ListItemButton
                            component={NavLink}
                            to={child.path}
                            sx={{
                              mb: "8px",

                              gap: { md: "12px" },
                              justifyContent: {
                                sm: "center",
                                md: "flex-start",
                              },
                              padding: { md: "10px 16px" },
                              paddingLeft: { md: 4 },
                              color: colors.gray20,
                              display: "flex",
                              alignItems: "center",
                              "&.active": {
                                bgcolor: colors.primary,
                                color: colors.black,
                                borderRadius: "14px",
                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  width: "100%",
                                  height: "100%",
                                  zIndex: -1,
                                },
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color: "inherit",
                                minWidth: "auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "20px",
                                height: "20px",
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText
                              sx={{
                                display: { xs: "none", md: "block" },
                              }}
                              primary={child.label}
                              primaryTypographyProps={{
                                fontSize: "14px",
                                fontWeight: 500,
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={item.path}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { md: "12px" },
                      justifyContent: { sm: "center" },
                      padding: { md: "10px 16px" },
                      mb: "8px",
                      color: colors.gray20,
                      "&.active": {
                        width: { sm: "34px" },
                        height: { sm: "34px" },
                        bgcolor: colors.primary,
                        color: colors.black,
                        borderRadius: "14px",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                        minWidth: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20px",
                        height: "20px",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ display: { xs: "none", md: "block" } }}
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </Box>
          ))}
        </List>
        <Logout />
      </Stack>
    </Box>
  );
};
