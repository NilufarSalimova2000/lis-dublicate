import { Box, IconButton, Stack, Typography } from "@mui/material";
import { MenuIcon, Eye, Trash2, Pencil } from "lucide-react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReusableMenu } from "../../../ui/menu";
import { ReusableDialog } from "../../../ui/dialog";
import dayjs from "dayjs";
import { IWarehouse } from "../../../shared/types/warehouse";

interface ColumnsWarehouseProps {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, id: number) => void;
  handleCloseMenu: () => void;
  handleViewClick: (row: IWarehouse) => void;
  openView: boolean;
  selectedRow: IWarehouse | null;
  handleCloseView: () => void;
}

export const columnsWarehouse = ({
  anchorEl,
  menuRowId,
  handleOpenMenu,
  handleCloseMenu,
  handleViewClick,
  openView,
  selectedRow,
  handleCloseView,
}: ColumnsWarehouseProps): GridColDef<IWarehouse>[] => {
  return [
    {
      field: "id",
      headerName: "№",
      width: 70,
      renderCell: (params: GridRenderCellParams<IWarehouse>) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params: GridRenderCellParams<IWarehouse>) =>
        params.value || "—",
    },
    {
      field: "manufacturedDate",
      headerName: "Manufactured date",
      flex: 1,
      renderCell: (params: GridRenderCellParams<IWarehouse>) => {
        const date = params.value;
        return date ? dayjs(date).format("DD.MM.YYYY") : "—";
      },
    },
    {
      field: "serialNumber",
      headerName: "Serial number",
      flex: 1,
      renderCell: (params: GridRenderCellParams<IWarehouse>) =>
        params.value || "—",
    },
    {
      field: "storePlace",
      headerName: "Store place",
      flex: 1,
      renderCell: (params: GridRenderCellParams<IWarehouse>) =>
        params.value || "—",
    },
    
    {
      field: "count",
      headerName: "Count",
      flex: 1,
      renderCell: (params: GridRenderCellParams<IWarehouse>) =>
        params.value || "—",
    },
    {
      field: "actions",
      headerName: "Menu",
      width: 70,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<IWarehouse>) => {
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
          {
            icon: <Trash2 />,
            label: "Delete",
            onClick: () => {
              console.log(row);
              
            },
          },
          {
            icon: <Pencil />,
            label: "Edit",
            onClick: () => {
              console.log(row);
              
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
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        Name:{" "}
                        <Typography variant="body1">
                          {selectedRow.name || "-"}
                        </Typography>
                      </Typography>
                      <Typography
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        Item description:{" "}
                        <Typography variant="body1">
                          {selectedRow.itemDescription || "-"}
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
