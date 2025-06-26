import { Box, IconButton, Stack, Typography } from "@mui/material";
import { MenuIcon, Eye, Users, Trash2 } from "lucide-react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReusableMenu } from "../../../ui/menu";
import { ReusableDialog } from "../../../ui/dialog";
import { NurseTestTubeType } from "../../../shared/types/users/nurse-test-tube";

interface ColumnsNurseWorksheets {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, id: number) => void;
  handleCloseMenu: () => void;
  handleViewClick: (row: NurseTestTubeType) => void;
  openView: boolean;
  selectedRow: NurseTestTubeType | null;
  handleCloseView: () => void;
  handleOpenPatientsModal: (id: number) => void;
  openDelete: boolean;
  selectedDeleteRow: NurseTestTubeType | null;
  handleCloseDelete: () => void;
  handleDeleteConfirm: () => void;
  setSelectedDeleteRow: (row: NurseTestTubeType) => void;
  openDeleteDialog: () => void;
}

export const columnsWorksheets = ({
  anchorEl,
  menuRowId,
  handleOpenMenu,
  handleCloseMenu,
  handleViewClick,
  openView,
  selectedRow,
  handleCloseView,
  handleOpenPatientsModal,
  openDelete,
  selectedDeleteRow,
  handleCloseDelete,
  handleDeleteConfirm,
  setSelectedDeleteRow,
  openDeleteDialog,
}: ColumnsNurseWorksheets): GridColDef<NurseTestTubeType>[] => {
  return [
    {
      field: "id",
      headerName: "№",
      width: 70,
      renderCell: (params: GridRenderCellParams<NurseTestTubeType>) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "title",
      headerName: "Name",
      flex: 1,
      renderCell: (params: GridRenderCellParams<NurseTestTubeType>) =>
        params.value || "—",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params: GridRenderCellParams<NurseTestTubeType>) =>
        params.value || "—",
    },
    {
      field: "actions",
      headerName: "Menu",
      width: 70,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<NurseTestTubeType>) => {
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
            icon: <Users />,
            label: "Patients",
            onClick: () => {
              handleOpenPatientsModal(row.id);
              handleCloseMenu();
            },
          },
          {
            icon: <Trash2 />,
            label: "O'chirish",
            onClick: () => {
              setSelectedDeleteRow(row);
              openDeleteDialog();
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
                          {selectedRow.title || "-"}
                        </Typography>
                      </Typography>
                      <Typography
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        Description:{" "}
                        <Typography variant="body1">
                          {selectedRow.description || "-"}
                        </Typography>
                      </Typography>
                      <Typography
                        display="flex"
                        alignItems={"center"}
                        gap="5px"
                        variant="h6"
                      >
                        Types of analysis:{" "}
                        <Typography variant="body1">
                          {selectedRow.analyseType.length > 0
                            ? selectedRow.analyseType
                                .map((a) => a.nameUz)
                                .join(", ")
                            : "-"}
                        </Typography>
                      </Typography>
                    </Box>
                  </Stack>
                }
                showCancelButton
                showConfirmButton={false}
                cancelText="Cancel"
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
