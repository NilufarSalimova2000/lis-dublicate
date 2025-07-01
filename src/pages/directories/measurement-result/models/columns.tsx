import { IconButton, Stack, Typography } from "@mui/material";
import { MenuIcon, Eye, Trash2, Pencil } from "lucide-react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReusableMenu } from "../../../../ui/menu";
import { ReusableDialog } from "../../../../ui/dialog";
import { ResMeasurUnitT } from "../../../../shared/types/result-measurement-unit";

interface ColumnsProps {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, id: number) => void;
  handleCloseMenu: () => void;
  handleViewClick: (row: ResMeasurUnitT) => void;
  openView: boolean;
  selectedRow: ResMeasurUnitT | null;
  handleCloseView: () => void;
  openDelete: boolean;
  selectedDeleteRow: ResMeasurUnitT | null;
  handleCloseDelete: () => void;
  handleDeleteConfirm: () => void;
  setSelectedDeleteRow: (row: ResMeasurUnitT) => void;
  openDeleteDialog: () => void;
  handleEditClick: (row: ResMeasurUnitT) => void;
}

export const columnsMeasurRes = ({
  anchorEl,
  menuRowId,
  handleOpenMenu,
  handleCloseMenu,
  handleViewClick,
  openView,
  selectedRow,
  handleCloseView,
  openDelete,
  selectedDeleteRow,
  handleCloseDelete,
  handleDeleteConfirm,
  setSelectedDeleteRow,
  openDeleteDialog,
  handleEditClick
}: ColumnsProps): GridColDef<ResMeasurUnitT>[] => {
  return [
    {
      field: "id",
      headerName: "№",
      width: 70,
      renderCell: (params: GridRenderCellParams<ResMeasurUnitT>) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "nameRu",
      headerName: "Name (Ru)",
      flex: 1,
      renderCell: (params: GridRenderCellParams<ResMeasurUnitT>) =>
        params.value || "—",
    },
    {
      field: "nameUz",
      headerName: "Name (Uz)",
      flex: 1,
      renderCell: (params: GridRenderCellParams<ResMeasurUnitT>) =>
        params.value || "—",
    },
    {
        field: "resultType",
        headerName: "Result type",
        flex: 1,
        renderCell: (params: GridRenderCellParams<ResMeasurUnitT>) =>
          params.value || "—",
      },
    {
      field: "actions",
      headerName: "Menu",
      width: 70,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<ResMeasurUnitT>) => {
        const row = params.row;

        const menuItems = [
          {
            icon: <Eye />,
            label: "View",
            onClick: () => {
              handleViewClick(row);
              handleCloseMenu();
            },
          },
          {
            icon: <Trash2 />,
            label: "Delete",
            onClick: () => {
              setSelectedDeleteRow(row);
              openDeleteDialog();
              handleCloseMenu();
            },
          },
          {
            icon: <Pencil />,
            label: "Edit",
            onClick: () => {
              handleEditClick(row);
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
                      {selectedRow.nameUz || "-"}
                    </Typography>
                    <Typography mb={"10px"} variant="body1">
                      Name ru: {selectedRow.nameRu || "-"}
                    </Typography>
                  </Stack>
                }
                showCancelButton
                showConfirmButton={false}
                cancelText="Yopish"
              />
            )}

            {openDelete && selectedDeleteRow?.id === row.id && (
              <ReusableDialog
                open={openDelete}
                onClose={handleCloseDelete}
                title="Tasdiqlash"
                description="Ushbu ma'lumotni o‘chirishni xohlaysizmi?"
                confirmText="Ha, o‘chirish"
                cancelText="Bekor qilish"
                onConfirm={handleDeleteConfirm}
                showCancelButton
                showConfirmButton
              />
            )}
          </>
        );
      },
    },
  ];
};
