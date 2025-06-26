import { IconButton } from "@mui/material";
import { FileDigit, MenuIcon } from "lucide-react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { AnalyseListT } from "../../../shared/types/analyse";
import { toast } from "react-toastify";
import { ReusableMenu } from "../../../ui/menu";

interface ColumnsAnalyseProps {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, id: number) => void;
  handleCloseMenu: () => void;
  handleOpenInteriorModal?: (row: AnalyseListT) => void;
}

export const columnsAnalyses = ({
  anchorEl,
  menuRowId,
  handleOpenMenu,
  handleCloseMenu,
  handleOpenInteriorModal
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
        params.row.analyseDetails?.internalNumber || "—",
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
            icon: <FileDigit />,
            label: "Internal number",
            onClick: () => {
              if (row.analyseDetails?.internalNumber) {
                toast.info(`Internal number: ${row.analyseDetails?.internalNumber}`);
              } else {
                handleOpenInteriorModal?.(row);
              }
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
          </>
        );
      },
    },
  ];
};
