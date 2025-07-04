import { Box, CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { organizationId } from "../../shared/constants";
import { useToggle } from "../../hooks/useToggle";
import { Table } from "../../ui/table";
import { colors } from "../../mui-config/colors";
import { columnsWorksheets } from "./models/columns";
import {
  useDeleteNurseTestTubeMutation,
  useGetNurseTestTubeMutation,
} from "../../redux/services/lis/nurse-test-tube";
import { ReusableDialog } from "../../ui/dialog";
import { PatientsModalTable } from "../../components/patient-modal-table";
import { NurseTestTubeType } from "../../shared/types/users/nurse-test-tube";
import { toast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchInput } from "../../components/search-input";

export const Worksheets = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const [getPatients, { data, isLoading, error }] =
    useGetNurseTestTubeMutation();
  const [deleteNurseTestTube] = useDeleteNurseTestTubeMutation();
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (organizationId !== null) {
      getPatients({
        orgId: organizationId,
        page,
        limit,
        search: { value: debouncedSearch },
      });
    }
  }, [getPatients, organizationId, page, limit, debouncedSearch]);

  const {
    open: openView,
    handleOpen: openViewDialog,
    handleClose: closeViewDialog,
  } = useToggle();

  const {
    open: openPatientsModal,
    handleOpen: openPatientsModalOpen,
    handleClose: closePatientsModal,
  } = useToggle();

  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );

  const handleOpenPatientsModal = (id: number) => {
    setSelectedPatientId(id);
    openPatientsModalOpen();
    handleCloseMenu();
  };

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
    useState<NurseTestTubeType | null>(null);

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteRow) return;

    try {
      await deleteNurseTestTube(selectedDeleteRow.id).unwrap();

      toast.success("Muvaffaqiyatli o‘chirildi");

      closeDeleteDialog();
      setSelectedDeleteRow(null);
    } catch (err) {
      toast.error("O‘chirishda xatolik yuz berdi");
      console.error("Delete error:", err);
    }
  };

  const columns = columnsWorksheets({
    anchorEl: menuAnchorEl,
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
        <Stack
          marginBottom={"20px"}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Stack>
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

      {openPatientsModal && selectedPatientId && (
        <ReusableDialog
          width="1200px"
          open={openPatientsModal}
          onClose={() => {
            closePatientsModal();
            setSelectedPatientId(null);
          }}
          title="Patients"
          description={<PatientsModalTable nurseTestId={selectedPatientId} />}
          cancelText="Cancel"
          showConfirmButton={false}
        />
      )}
    </Box>
  );
};
