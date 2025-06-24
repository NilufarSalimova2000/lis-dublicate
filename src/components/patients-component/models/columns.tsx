import { IconButton } from "@mui/material";
import { MenuIcon, Eye, FileDigit, TestTubes } from "lucide-react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReusableMenu } from "../../../ui/menu";
import { UsersType } from "../../../shared/types/users";
import dayjs from "dayjs";
import { toast } from "react-toastify";

interface ColumnsPatientProps {
  anchorEl: HTMLElement | null;
  menuRowId: number | null;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, id: number) => void;
  handleCloseMenu: () => void;
  handleOpenInteriorModal?: (row: UsersType) => void;
  navigate?: (to: string) => void;
}

export const columnsPatient = ({
  anchorEl,
  menuRowId,
  handleOpenMenu,
  handleCloseMenu,
  handleOpenInteriorModal,
  navigate,
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
            label: "View",
            onClick: () => {
              navigate?.(`/appointment/detail/${row.id}`);
              handleCloseMenu();
            },
          },
          {
            icon: <FileDigit />,
            label: "Nurse interior number",
            onClick: () => {
              if (row.nurseInteriorNumber) {
                toast.info(`Interior number: ${row.nurseInteriorNumber}`);
              } else {
                handleOpenInteriorModal?.(row);
              }
              handleCloseMenu();
            },
          },
          {
            icon: <TestTubes />,
            label: "Analyses",
            onClick: () => {
              navigate?.(`/appointment/analyses/${row.id}`);
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
