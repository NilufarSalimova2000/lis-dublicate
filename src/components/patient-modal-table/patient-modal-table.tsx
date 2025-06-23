import { useEffect, useState } from "react";
import { Table } from "../../ui/table";
import { columnsPatient } from "../patients-component/models/columns";
import { Box, CircularProgress } from "@mui/material";
import { useGetNurseTestMutation } from "../../redux/services/lis/users";
import { UsersType } from "../../shared/types/users";
import { useToggle } from "../../hooks/useToggle";

interface PatientsModalTableProps {
  nurseTestId: number | null;
}

export const PatientsModalTable = ({
  nurseTestId,
}: PatientsModalTableProps) => {
  const [getPatients, { data, isLoading, error }] = useGetNurseTestMutation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (nurseTestId) {
      getPatients({
        nurseTestId,
        page,
        limit,
        search: { value: "" },
      });
    }
  }, [nurseTestId, page, limit]);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<UsersType | null>(null);

  const {
    open: openView,
    handleOpen: handleOpenView,
    handleClose: handleCloseView,
  } = useToggle();

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    rowId: number
  ) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setMenuRowId(null);
  };

  const handleViewClick = (row: UsersType) => {
    setSelectedRow(row);
    handleOpenView();
    handleCloseMenu();
  };

  if (!nurseTestId) return null;
  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" py={3}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Box color="red">Xatolik yuz berdi</Box>;

  return (
    <Table
      columns={columnsPatient({
        anchorEl: menuAnchorEl,
        menuRowId,
        handleOpenMenu,
        handleCloseMenu,
        handleViewClick,
        openView,
        selectedRow,
        handleCloseView,
      })}
      rows={data || []}
      page={page}
      limit={limit}
      total={(data && data.length) || 0}
      onPageChange={setPage}
      onLimitChange={(value) => {
        setLimit(value);
        setPage(0);
      }}
    />
  );
};
