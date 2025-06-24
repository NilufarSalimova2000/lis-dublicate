import { Box, CircularProgress, Stack } from "@mui/material";
import { useState } from "react";
import { columnsAnalyses } from "./columns";
import { colors } from "../../../mui-config/colors";
import { Table } from "../../../ui/table";
import { organizationId } from "../../../shared/constants";
import { useGetAnalysePatientQuery } from "../../../redux/services/lis/analyse";
import { AnalyseListT } from "../../../shared/types/analyse";

interface AnalyseTableProps {
    patientId: number;
  }

export const AnalyseTable = ({ patientId }: AnalyseTableProps) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const { data, isLoading, error } = useGetAnalysePatientQuery({
    patientId,
    orgId: organizationId,
    page,
    limit,
    search: { value: "" },
  });
  const [_selectedRows, setSelectedRows] = useState<AnalyseListT[]>([]);

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

  const columns = columnsAnalyses({
    anchorEl: menuAnchorEl,
    menuRowId,
    handleOpenMenu,
    handleCloseMenu,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box color="red">Xatolik yuz berdi!</Box>;
  }

  return (
    <Box marginTop={"15px"}>
      <Stack bgcolor={colors.pureWhite} borderRadius={"16px"}>
        <Table
          columns={columns}
          rows={data?.data?.list || []}
          page={page}
          limit={limit}
          total={data?.data?.total || 0}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(0);
          }}
          pageSizeOptions={[5, 10, 20]}
          onSelectRowsChange={setSelectedRows}
          isRowSelectable={(params) => !!params.row.nurseInteriorNumber}
        />
      </Stack>
    </Box>
  );
};
