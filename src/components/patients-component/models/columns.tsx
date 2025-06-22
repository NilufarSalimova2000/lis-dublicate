import { Box, IconButton, Stack, Typography } from "@mui/material";
import { MenuIcon, Eye } from "lucide-react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReusableMenu } from "../../../ui/menu";
import { UsersType } from "../../../shared/types/users";
import { ReusableDialog } from "../../../ui/dialog";
import dayjs from "dayjs";

interface ColumnsPatientProps {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, id: number) => void;
  handleCloseMenu: () => void;
  handleViewClick: (row: UsersType) => void;
  openView: boolean;
  selectedRow: UsersType | null;
  handleCloseView: () => void;
}

export const columnsPatient = ({
  anchorEl,
  menuRowId,
  handleOpenMenu,
  handleCloseMenu,
  handleViewClick,
  openView,
  selectedRow,
  handleCloseView,
}: ColumnsPatientProps): GridColDef<UsersType>[] => {
  return [
    {
      field: "id",
      headerName: "№",
      width: 70,
      renderCell: (params: GridRenderCellParams<UsersType>) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "fullName",
      headerName: "Fullname",
      flex: 2,
      renderCell: (params: GridRenderCellParams<UsersType>) => {
        const row = params?.row;
        if (!row) return "—";
        const fullName = `${row.lastName ?? ""} ${row.firstName ?? ""} ${
          row.middleName ?? ""
        }`.trim();
        return fullName || "—";
      },
    },
    {
      field: "pnfl",
      headerName: "PNFL",
      flex: 1,
      renderCell: (params: GridRenderCellParams<UsersType>) =>
        params.value || "—",
    },
    {
      field: "nurseInteriorNumber",
      headerName: "Nurse interior number",
      flex: 1,
      renderCell: (params: GridRenderCellParams<UsersType>) =>
        params.value || "—",
    },
    {
      field: "dateOfBirth",
      headerName: "Date of birth",
      flex: 1,
      renderCell: (params: GridRenderCellParams<UsersType>) => {
        const date = params.value;
        return date ? dayjs(date).format("DD.MM.YYYY") : "—";
      },
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
      renderCell: (params: GridRenderCellParams<UsersType>) =>
        params.value?.name || "—",
    },
    {
      field: "district",
      headerName: "District",
      flex: 1,
      renderCell: (params: GridRenderCellParams<UsersType>) =>
        params.value?.name || "—",
    },
    {
      field: "actions",
      headerName: "Menu",
      width: 70,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<UsersType>) => {
        const row = params.row;

        const menuItems = [
          {
            icon: <Eye />,
            label: "Batafsil",
            onClick: () => {
              handleViewClick(row);
              handleCloseMenu();
            },
          },
        ];

        return (
          <>
            <IconButton onClick={(e) => handleOpenMenu(e, row.id)}>
              <MenuIcon />
            </IconButton>
            {menuRowId === row.id && (
              <ReusableMenu
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                menuItems={menuItems}
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
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        Full name:{" "}
                        <Typography variant="body1">
                          {`${selectedRow.lastName || ""} ${
                            selectedRow.firstName || ""
                          } ${selectedRow.middleName || ""}`.trim() || "-"}
                        </Typography>
                      </Typography>
                      <Typography
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        PNFL:{" "}
                        <Typography variant="body1">
                          {selectedRow.pnfl || "-"}
                        </Typography>
                      </Typography>
                      <Typography
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        Passport serial number:{" "}
                        <Typography variant="body1">
                          {`${selectedRow.passportSerial || ""} ${
                            selectedRow.passportNumber || ""
                          }`.trim() || "-"}
                        </Typography>
                      </Typography>
                      <Typography
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
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
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        Address:{" "}
                        <Typography variant="body1">
                          {selectedRow.address || "-"}
                        </Typography>
                      </Typography>
                      <Typography
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        Phone:{" "}
                        <Typography variant="body1">
                          {selectedRow.phone || "-"}
                        </Typography>
                      </Typography>
                      <Typography
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        Nationality:{" "}
                        <Typography variant="body1">
                          {selectedRow.nationality || "-"}
                        </Typography>
                      </Typography>
                      <Typography
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        Region:{" "}
                        <Typography variant="body1">
                          {selectedRow.region?.name || "-"}
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
};
