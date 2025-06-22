// import {
//   Box,
//   Button,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { NavLink } from "react-router-dom";
// import { LogOut, Bell } from "lucide-react";
// import { colors } from "../../mui-config/colors";
// import { navItems } from "../sidebar/sidebar";

// export const SidebarMobile = ({ onClose }: { onClose: () => void }) => {
//   return (
//     <Box>
//       <Stack direction="row" alignItems="center" gap="12px" my="15px">
//         <Box
//           width={"36px"}
//           height={"36px"}
//           borderRadius={"12px"}
//           bgcolor={colors.creamBg}
//           padding={"8px"}
//         >
//           <Bell />
//         </Box>
//         <Typography fontSize={"16px"} variant="h6">
//           User
//         </Typography>
//       </Stack>

//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.label} disablePadding>
//             <ListItemButton
//               component={NavLink}
//               to={item.path}
//               onClick={onClose}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "12px",
//                 marginBottom: "8px",
//                 color: colors.gray20,
//                 "&.active": {
//                   bgcolor: colors.primary,
//                   color: colors.black,
//                   borderRadius: "14px",
//                 },
//               }}
//             >
//               <ListItemIcon sx={{ color: "inherit", minWidth: "auto" }}>
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText
//                 primary={item.label}
//                 primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//       <Button
//         fullWidth
//         variant="contained"
//         startIcon={<LogOut />}
//         sx={{
//           mt: 2,
//           backgroundColor: colors.creamBg,
//           color: colors.gray20,
//           "&:hover": {
//             backgroundColor: colors.creamBg,
//           },
//         }}
//       >
//         Logout
//       </Button>
//     </Box>
//   );
// };

import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { LogOut, Bell, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { colors } from "../../mui-config/colors";
import { navItems } from "../sidebar/sidebar";

export const SidebarMobile = ({ onClose }: { onClose: () => void }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const handleToggle = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isChildActive = (children: any[]) => {
    return children?.some((child) => location.pathname === child.path);
  };

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <Box>
      <Stack direction="row" alignItems="center" gap="12px" my="15px">
        <Box
          width={"36px"}
          height={"36px"}
          borderRadius={"12px"}
          bgcolor={colors.creamBg}
          padding={"8px"}
        >
          <Bell />
        </Box>
        <Typography fontSize={"16px"} variant="h6">
          {user?.fullName || "User"}
        </Typography>
      </Stack>

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
                      gap: "12px",
                      mb: "8px",
                      color: colors.gray20,
                      bgcolor: isChildActive(item.children)
                        ? colors.primary
                        : "transparent",
                      borderRadius: isChildActive(item.children) ? "14px" : "0",
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit", minWidth: "auto" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    />
                    {openMenus[item.label] ? <ChevronUp /> : <ChevronDown />}
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
                          onClick={onClose}
                          sx={{
                            color: colors.gray20,
                            pl: 4,
                            mb: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            borderRadius: "10px",
                            "&.active": {
                              bgcolor: colors.primary,
                              color: colors.black,
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{ color: "inherit", minWidth: "auto" }}
                          >
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{ fontSize: "13px" }}
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
                  onClick={onClose}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    mb: "8px",
                    color: colors.gray20,
                    "&.active": {
                      bgcolor: colors.primary,
                      color: colors.black,
                      borderRadius: "14px",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: "auto" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
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

      <Button
        fullWidth
        variant="contained"
        startIcon={<LogOut />}
        sx={{
          mt: 2,
          backgroundColor: colors.creamBg,
          color: colors.gray20,
          "&:hover": {
            backgroundColor: colors.creamBg,
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
};
