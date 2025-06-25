import { Box, CircularProgress, Stack } from "@mui/material";
import { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { Table } from "../../ui/table";
import { colors } from "../../mui-config/colors";
import { columnsLabrantTest } from "./models/columns";
import {
  useDeleteLabrantTestTubeMutation,
  useGetLabrantTestTubeQuery,
} from "../../redux/services/lis/labrant-test-tube";
import { LabrantTestTubeT } from "../../shared/types/labrant-test-tube";
import { toast } from "react-toastify";

export const LaboratoryTestTube = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const { data, isLoading, error, refetch } = useGetLabrantTestTubeQuery({
    page,
    limit,
    search: { value: "" },
  });
  const [deleteLabrantTestTube] = useDeleteLabrantTestTubeMutation();

  const {
    open: openView,
    handleOpen: openViewDialog,
    handleClose: closeViewDialog,
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

  const handleViewClick = (row: any) => {
    setSelectedRow(row);
    openViewDialog();
    handleCloseMenu();
  };

  const handleCloseView = () => {
    closeViewDialog();
    setSelectedRow(null);
  };

  const {
    open: openDelete,
    handleOpen: openDeleteDialog,
    handleClose: closeDeleteDialog,
  } = useToggle();

  const [selectedDeleteRow, setSelectedDeleteRow] =
    useState<LabrantTestTubeT | null>(null);

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteRow) return;

    try {
      await deleteLabrantTestTube(selectedDeleteRow.id).unwrap();

      toast.success("Muvaffaqiyatli o‘chirildi");

      closeDeleteDialog();
      setSelectedDeleteRow(null);
      refetch();
    } catch (err) {
      toast.error("O‘chirishda xatolik yuz berdi");
      console.error("Delete error:", err);
    }
  };

  const columns = columnsLabrantTest({
    anchorEl: menuAnchorEl,
    menuRowId,
    handleOpenMenu,
    handleCloseMenu,
    handleViewClick,
    openView,
    selectedRow,
    handleCloseView,
    openDelete,
    selectedDeleteRow,
    handleCloseDelete: closeDeleteDialog,
    handleDeleteConfirm,
    openDeleteDialog,
    setSelectedDeleteRow,
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
    <Box padding={{ sm: "0 28px 28px 28px", xs: "0 16px 16px 16px" }}>
      <Stack bgcolor={colors.pureWhite} borderRadius={"16px"} padding={"16px"}>
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
        />
      </Stack>
    </Box>
  );
};
