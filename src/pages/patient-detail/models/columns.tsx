import { IconButton } from "@mui/material";
import { MenuIcon, Eye } from "lucide-react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReusableMenu } from "../../../ui/menu";
import dayjs from "dayjs";
import { AnalyseListT } from "../../../shared/types/analyse";

interface ColumnsAnalyseProps {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, id: number) => void;
  handleCloseMenu: () => void;
}

export const columnsAnalyses = ({
  anchorEl,
  menuRowId,
  handleOpenMenu,
  handleCloseMenu,
}: ColumnsAnalyseProps): GridColDef<AnalyseListT>[] => {
  return [
    {
      field: "id",
      headerName: "№",
      width: 70,
      renderCell: (params: GridRenderCellParams<AnalyseListT>) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "analyseNameOfLoinc",
      headerName: "Analyse name of loinc",
      flex: 1,
      renderCell: (params: GridRenderCellParams<AnalyseListT>) =>
        params.value || "—",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams<AnalyseListT>) =>
        params.value || "—",
    },
    {
      field: "internalNumber",
      headerName: "Internal number",
      flex: 1,
      renderCell: (params: GridRenderCellParams<AnalyseListT>) =>
        params.value || "—",
    },
    {
      field: "nameUz",
      headerName: "Type biomaterial",
      flex: 1,
      renderCell: (params: GridRenderCellParams<AnalyseListT>) =>
        params.row.analyseDetails?.typeBiomaterial?.nameUz || "—",
    },
    {
      field: "dateOfFence",
      headerName: "Date of fence",
      flex: 1,
      renderCell: (params: GridRenderCellParams<AnalyseListT>) => {
        const date = params.value;
        return date ? dayjs(date).format("DD.MM.YYYY") : "—";
      },
    },
    {
      field: "actions",
      headerName: "Menu",
      width: 70,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<AnalyseListT>) => {
        const row = params.row;

        const menuItems = [
          {
            icon: <Eye />,
            label: "View",
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
          </>
        );
      },
    },
  ];
};
