import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  useCreateLabrantInteriorNumberMutation,
  useGetAnalysePatientQuery,
} from "../../redux/services/lis/analyse";
import { organizationId } from "../../shared/constants";
import { AnalyseListT } from "../../shared/types/analyse";
import { columnsAnalyses } from "./models/columns";
import { colors } from "../../mui-config/colors";
import { Table } from "../../ui/table";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ReusableDialog } from "../../ui/dialog";
import { useToggle } from "../../hooks/useToggle";
import { LabWorkSheetForm } from "./models/labWorksheet";

interface AnalyseTableProps {
  patientId: number;
}

interface InteriorFormData {
  number: string;
}

export const AnalyseTable = ({ patientId }: AnalyseTableProps) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const { data, isLoading, error, refetch } = useGetAnalysePatientQuery({
    patientId,
    orgId: organizationId,
    page,
    limit,
    search: { value: "" },
  });
  const [selectedRows, setSelectedRows] = useState<AnalyseListT[]>([]);

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

  const {
    open: openInteriorModal,
    handleOpen: openInteriorOpen,
    handleClose: closeInteriorModal,
  } = useToggle();

  const [currentAnalyse, setCurrentAnalyse] = useState<AnalyseListT | null>(
    null
  );

  const handleOpenInteriorModal = (row: AnalyseListT) => {
    setCurrentAnalyse(row);
    openInteriorOpen();
  };

  const [createInteriorNumber] = useCreateLabrantInteriorNumberMutation();
  const { register, handleSubmit, reset } = useForm<InteriorFormData>();

  const handleSubmitInteriorNumber = async (data: InteriorFormData) => {
    if (!currentAnalyse) return;

    if (!organizationId) {
      toast.error("Tashkilot ID mavjud emas");
      return;
    }

    try {
      const res = await createInteriorNumber({
        id: currentAnalyse.id,
        internalNumber: data.number,
      }).unwrap();

      toast.success(res.message);
      await refetch();
      closeInteriorModal();
    } catch (error) {
      toast.error("Qo‘shishda xatolik yuz berdi");
    }
  };

  const {
    open: isLabWorksheetOpen,
    handleOpen: openLabWorksheetModal,
    handleClose: closeLabWorkModal,
  } = useToggle();

  const columns = columnsAnalyses({
    anchorEl: menuAnchorEl,
    menuRowId,
    handleOpenMenu,
    handleCloseMenu,
    handleOpenInteriorModal,
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
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        marginBottom={"15px"}
      >
        <Typography mb={"10px"} variant="h6">
          Analyses
        </Typography>
        {selectedRows.length > 0 && (
          <Button onClick={openLabWorksheetModal} variant="contained">
            Lab worksheet
          </Button>
        )}
      </Stack>
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
          isRowSelectable={(params) =>
            !!params.row.analyseDetails?.internalNumber
          }
        />
      </Stack>

      <ReusableDialog
        open={openInteriorModal}
        onClose={() => {
          closeInteriorModal();
          setCurrentAnalyse(null);
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
        open={isLabWorksheetOpen}
        onClose={closeLabWorkModal}
        title="Create Lab Worksheet"
        width={400}
        description={
          <LabWorkSheetForm
            orgId={organizationId}
            selectedPatients={selectedRows}
            onSubmitSuccess={() => {
              toast.success("Test tube yaratildi");
              closeLabWorkModal();
              setSelectedRows([]);
              refetch();
            }}
          />
        }
        cancelText="cancel"
        showConfirmButton={false}
      />
    </Box>
  );
};
