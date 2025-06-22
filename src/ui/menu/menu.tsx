import React, { ReactNode } from "react";
import { Menu, MenuItem, MenuProps } from "@mui/material";
import { colors } from "../../mui-config/colors";

interface MenuItemType {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
}

interface ReusableMenuProps extends Omit<MenuProps, "children" | "open"> {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  menuItems: MenuItemType[];
}

export const ReusableMenu: React.FC<ReusableMenuProps> = ({
  anchorEl,
  onClose,
  menuItems,
  ...rest
}) => {
  const open = Boolean(anchorEl);

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose} {...rest}>
      {menuItems.map((item, index) => (
        <MenuItem
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ":hover": {
              backgroundColor: `${colors.grayBg}`,
              color: "primary.main",
            },
          }}
          key={index}
          onClick={() => {
            item.onClick?.();
            onClose();
          }}
        >
          {item.icon}
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};
