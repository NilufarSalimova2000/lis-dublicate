import { useEffect, useState } from "react";
import { Table } from "../../ui/table";
import { columnsPatient } from "../patients-component/models/columns";
import { Box, CircularProgress } from "@mui/material";
import { useGetNurseTestMutation } from "../../redux/services/lis/users";
import { useNavigate } from "react-router-dom";

interface PatientsModalTableProps {
  nurseTestId: number | null;
}

export const PatientsModalTable = ({
  nurseTestId,
}: PatientsModalTableProps) => {
  const [getPatients, { data, isLoading, error }] = useGetNurseTestMutation();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();

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
        navigate,
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
