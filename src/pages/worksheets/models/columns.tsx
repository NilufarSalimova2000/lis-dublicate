import { Box, IconButton, Stack, Typography } from "@mui/material";
import { MenuIcon, Eye, Trash2, Pencil } from "lucide-react";
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
                          {selectedRow.title || "-"}
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
                          {selectedRow.description || "-"}
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
