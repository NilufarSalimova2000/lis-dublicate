import { IconButton, Stack, Typography } from "@mui/material";
import { MenuIcon, Eye } from "lucide-react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReusableMenu } from "../../../../ui/menu";
import { ReusableDialog } from "../../../../ui/dialog";
import { IOrganization } from "../../../../shared/types/common";
import { colors } from "../../../../mui-config/colors";

interface ColumnsOrganizationProps {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, id: number) => void;
  handleCloseMenu: () => void;
  handleViewClick: (row: IOrganization) => void;
  openView: boolean;
  selectedRow: IOrganization | null;
  handleCloseView: () => void;
}

export const columnsOrganization = ({
  anchorEl,
  menuRowId,
  handleOpenMenu,
  handleCloseMenu,
  handleViewClick,
  openView,
  selectedRow,
  handleCloseView,
}: ColumnsOrganizationProps): GridColDef<IOrganization>[] => {
  return [
    {
      field: "id",
      headerName: "№",
      width: 70,
      renderCell: (params: GridRenderCellParams<IOrganization>) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 3,
      renderCell: (params: GridRenderCellParams<IOrganization>) =>
        params.value || "—",
    },
    {
      field: "children",
      headerName: "Department Count",
      flex: 1,
      renderCell: (params: GridRenderCellParams<IOrganization>) =>
        Array.isArray(params.value) ? params.value.length : "—",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams<IOrganization>) =>
        params.value || "—",
    },
    {
      field: "actions",
      headerName: "Menu",
      width: 70,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<IOrganization>) => {
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
                title="Info"
                description={
                  <Stack>
                    <Typography mb={"10px"} variant="h5">
                      {selectedRow.name || "-"}
                    </Typography>
                    <Typography mb={"10px"} color="primary" variant="body1">
                      ID: {selectedRow.id || "-"}
                    </Typography>
                    <Typography mb={"10px"} variant="body1">
                      UUID: {selectedRow.uuid || "-"}
                    </Typography>
                    <Typography
                      padding={"5px"}
                      color={colors.pureWhite}
                      width={"70px"}
                      borderRadius={"15px"}
                      bgcolor={colors.primary}
                      variant="body1"
                    >
                      {selectedRow.status || "-"}
                    </Typography>
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
