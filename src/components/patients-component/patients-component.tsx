import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGetPatientsMutation } from "../../redux/services/lis/users";
import { organizationId } from "../../shared/constants";
import { useToggle } from "../../hooks/useToggle";
import { columnsPatient } from "./models/columns";
import { Table } from "../../ui/table";
import { colors } from "../../mui-config/colors";
import { Link, useNavigate } from "react-router-dom";
import { ReusableDialog } from "../../ui/dialog";
import { NurseSheetForm } from "../nurse-sheet-form";
import { UsersType } from "../../shared/types/users";
import { toast } from "react-toastify";
import { useCreateInteriorNumberMutation } from "../../redux/services/lis/analyse";
import { useForm } from "react-hook-form";
import Barcode from "react-barcode";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchInput } from "../search-input";

interface InteriorNumberFormValues {
  number: string;
}

export const PatientsComponent = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const [getPatients, { data, isLoading, error }] = useGetPatientsMutation();
  const [selectedRows, setSelectedRows] = useState<UsersType[]>([]);
  const navigate = useNavigate();
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
    open: isNurseSheetOpen,
    handleOpen: openNurseSheetModal,
    handleClose: closeNurseSheetModal,
  } = useToggle();

  const {
    open: openInteriorModal,
    handleOpen: openInteriorOpen,
    handleClose: closeInteriorModal,
  } = useToggle();

  const [currentPatient, setCurrentPatient] = useState<UsersType | null>(null);

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

  const handleOpenInteriorModal = (row: UsersType) => {
    setCurrentPatient(row);
    openInteriorOpen();
  };

  const [createInteriorNumber] = useCreateInteriorNumberMutation();
  const { register, handleSubmit, reset } = useForm<InteriorNumberFormValues>();

  const handleSubmitInteriorNumber = async (data: InteriorNumberFormValues) => {
    if (!currentPatient) return;
    try {
      if (!organizationId) {
        toast.error("Tashkilot ID mavjud emas");
        return;
      }
      const res = await createInteriorNumber({
        userId: currentPatient.id,
        departmentId: organizationId,
        internalNumber: data.number,
      }).unwrap();

      toast.success(`Qo‘shildi: ${res.number}`);
      closeInteriorModal();
    } catch (error) {
      toast.error("Qo‘shishda xatolik yuz berdi");
    }
  };

  const {
    open: isBarcodeModalOpen,
    handleOpen: openBarcodeModal,
    handleClose: closeBarcodeModal,
  } = useToggle();

  const [selectedPatient, setSelectedPatient] = useState<UsersType | null>(
    null
  );

  const handleOpenBarcodeModal = (row: UsersType) => {
    setSelectedPatient(row);
    openBarcodeModal();
  };

  const columns = columnsPatient({
    anchorEl: menuAnchorEl,
    menuRowId,
    handleOpenMenu,
    handleCloseMenu,
    handleOpenInteriorModal,
    navigate,
    handleOpenBarcodeModal,
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
          <Stack direction={"row"} gap={"20px"}>
            <SearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {selectedRows.length > 0 && (
              <Button onClick={openNurseSheetModal} variant="outlined">
                Nurse's sheet
              </Button>
            )}
          </Stack>
          <Link style={{ textDecoration: "none" }} to={"/appointment/create"}>
            <Button
              sx={{ display: { xs: "none", sm: "block" } }}
              variant="contained"
            >
              + Registration
            </Button>

            <IconButton
              sx={{
                display: { xs: "flex", sm: "none" },
                bgcolor: `${colors.primary}`,
                width: "30px",
                height: "30px",
                borderRadius: "10px",
              }}
            >
              +
            </IconButton>
          </Link>
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
          onSelectRowsChange={setSelectedRows}
          isRowSelectable={(params) => !!params.row.nurseInteriorNumber}
        />
      </Stack>

      <ReusableDialog
        open={isNurseSheetOpen}
        onClose={closeNurseSheetModal}
        title="Nurse's Sheet"
        description={
          <NurseSheetForm
            orgId={organizationId!}
            selectedPatients={selectedRows}
            onSubmitSuccess={() => {
              closeNurseSheetModal();
              setSelectedRows([]);
            }}
          />
        }
        width={500}
        showConfirmButton={false}
        cancelText="Bekor qilish"
      />

      <ReusableDialog
        open={openInteriorModal}
        onClose={() => {
          closeInteriorModal();
          setCurrentPatient(null);
          reset();
        }}
        title="Assign interior number"
        width={400}
        description={
          <Box
            component="form"
            onSubmit={handleSubmit(handleSubmitInteriorNumber)}
          >
            <Stack spacing={2}>
              <Typography>
                {currentPatient?.lastName} {currentPatient?.firstName} uchun
                yangi nurse interior number kiriting:
              </Typography>
              <TextField
                size="small"
                placeholder="Interior number"
                fullWidth
                {...register("number", { required: true })}
              />
              <Button type="submit" variant="contained">
                Saqlash
              </Button>
            </Stack>
          </Box>
        }
        showCancelButton={false}
        showConfirmButton={false}
      />

      <ReusableDialog
        open={isBarcodeModalOpen}
        onClose={() => {
          closeBarcodeModal();
          setSelectedPatient(null);
        }}
        title="Barcode"
        width={400}
        description={
          selectedPatient ? (
            <Box display="flex" justifyContent="center" py={3}>
              <Barcode value={selectedPatient.pnfl.toString()} />
            </Box>
          ) : null
        }
        showConfirmButton={false}
        cancelText="cancel"
      />
    </Box>
  );
};
