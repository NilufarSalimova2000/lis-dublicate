import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, Box, Typography } from "@mui/material";
import { MenuIcon, Pencil, Trash2, Eye } from "lucide-react";
import { ReusableMenu } from "../../../ui/menu";
import { ReusableDialog } from "../../../ui/dialog/dialog";

export const dashboardColumns = ({
  anchorEl,
  menuRowId,
  handleOpenMenu,
  handleCloseMenu,
  handleDeleteClick,
  handleViewClick,
  openDelete,
  openView,
  selectedRow,
  handleCancelDelete,
  handleConfirmDelete,
  handleCloseView,
}: any): GridColDef[] => [
  {
    field: "№",
    headerName: "№",
    width: 70,
    renderCell: (params: any) =>
      params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
  },
  { field: "name", headerName: "First name", flex: 1 },
  { field: "lastName", headerName: "Last name", flex: 1 },
  { field: "age", headerName: "Age", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "address", headerName: "Address", flex: 1 },
  { field: "phoneNumber", headerName: "Phone number", flex: 1 },
  {
    field: "actions",
    headerName: "Menu",
    width: 70,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      const row = params.row;
      const isOpen = menuRowId === row.id;

      const menuItems = [
        {
          icon: <Pencil />,
          label: "Tahrirlash",
          onClick: () => {
            console.log("Edit", row.id);
            handleCloseMenu();
          },
        },
        {
          icon: <Trash2 />,
          label: "O‘chirish",
          onClick: () => handleDeleteClick(row),
        },
        {
          icon: <Eye />,
          label: "Batafsil",
          onClick: () => handleViewClick(row),
        },
      ];

      return (
        <>
          <IconButton onClick={(e) => handleOpenMenu(e, row.id)}>
            <MenuIcon />
          </IconButton>

          {isOpen && (
            <ReusableMenu
              anchorEl={anchorEl}
              onClose={handleCloseMenu}
              menuItems={menuItems}
            />
          )}

          {openDelete && (
            <ReusableDialog
              open={openDelete}
              onClose={handleCancelDelete}
              onConfirm={handleConfirmDelete}
              title="Foydalanuvchini o‘chirish"
              description="Haqiqatan ushbu foydalanuvchini o‘chirmoqchimisiz?"
              confirmText="O‘chirish"
              cancelText="Bekor qilish"
            />
          )}

          {openView && selectedRow?.id === row.id && (
            <ReusableDialog
            width={"700px"}
              open={openView}
              onClose={handleCloseView}
              title="User info"
              description={
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      gap={"5px"}
                      variant="h6"
                    >
                      Name:{" "}
                      <Typography variant="body1">
                        {selectedRow.name || "-"}
                      </Typography>
                    </Typography>
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      gap={"5px"}
                      variant="h6"
                    >
                      Last name:{" "}
                      <Typography variant="body1">
                        {selectedRow.lastName || "-"}
                      </Typography>
                    </Typography>
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      gap={"5px"}
                      variant="h6"
                    >
                      Age:{" "}
                      <Typography variant="body1">
                        {selectedRow.age || "-"}
                      </Typography>
                    </Typography>
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      gap={"5px"}
                      variant="h6"
                    >
                      Email:{" "}
                      <Typography variant="body1">
                        {selectedRow.email || "-"}
                      </Typography>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      gap={"5px"}
                      variant="h6"
                    >
                      Address:{" "}
                      <Typography variant="body1">
                        {selectedRow.address || "-"}
                      </Typography>
                    </Typography>
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      gap={"5px"}
                      variant="h6"
                    >
                      Phone:{" "}
                      <Typography variant="body1">
                        {selectedRow.phoneNumber || "-"}
                      </Typography>
                    </Typography>
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      gap={"5px"}
                      variant="h6"
                    >
                      Gender:{" "}
                      <Typography variant="body1">
                        {selectedRow.gender || "-"}
                      </Typography>
                    </Typography>
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      gap={"5px"}
                      variant="h6"
                    >
                      Language:{" "}
                      <Typography variant="body1">
                        {selectedRow.language || "-"}
                      </Typography>
                    </Typography>
                  </Box>
                </Stack>
              }
              showCancelButton
              showConfirmButton={false}
              cancelText="Yopish"
            />
          )}
        </>
      );
    },
  },
];
