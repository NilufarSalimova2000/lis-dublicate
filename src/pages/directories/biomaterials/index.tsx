import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useToggle } from "../../../hooks/useToggle";
import { Table } from "../../../ui/table";
import { colors } from "../../../mui-config/colors";
import {
  BiomaterialRequestT,
  BiomaterialType,
} from "../../../shared/types/analyse";
import { columnsBiomaterial } from "./models/columns";
import { ReusableDialog } from "../../../ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useCreateBiomaterialMutation,
  useDeleteBiomaterialMutation,
  useEditBiomaterialMutation,
  useGetBiomaterialQuery,
} from "../../../redux/services/lis/analyse/biomaterials";
import { useDebounce } from "../../../hooks/useDebounce";
import { SearchInput } from "../../../components/search-input";

export const Biomaterials = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<BiomaterialType | null>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, error, refetch } = useGetBiomaterialQuery({
    page,
    limit,
    search: { value: debouncedSearch },
  });
  const [deleteBiomaterial] = useDeleteBiomaterialMutation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editBiomaterial] = useEditBiomaterialMutation();

  const {
    open: openAddDialog,
    handleOpen: openAdd,
    handleClose: closeAdd,
  } = useToggle();

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

  const handleViewClick = (row: BiomaterialType) => {
    setSelectedRow(row);
    openViewDialog();
    handleCloseMenu();
  };

  const handleCloseView = () => {
    closeViewDialog();
    setSelectedRow(null);
  };

  const [createBiomaterial, { isLoading: isCreating }] =
    useCreateBiomaterialMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BiomaterialRequestT>();

  const handleEditClick = (row: BiomaterialType) => {
    setIsEditMode(true);
    setSelectedRow(row);
    openAdd();
    setValue("nameUz", row.nameUz);
    setValue("nameRu", row.nameRu);
  };

  const onSubmit = async (values: BiomaterialRequestT) => {
    try {
      if (isEditMode && selectedRow?.id) {
        await editBiomaterial({ id: selectedRow.id, data: values }).unwrap();
        toast.success("Muvaffaqiyatli o'zgartirildi");
      } else {
        await createBiomaterial(values).unwrap();
        toast.success("Yaratildi");
      }

      closeAdd();
      reset();
      setIsEditMode(false);
      setSelectedRow(null);
      refetch();
    } catch (e) {
      toast.error("Xatolik yuz berdi");
      console.error(e);
    }
  };

  const {
    open: openDelete,
    handleOpen: openDeleteDialog,
    handleClose: closeDeleteDialog,
  } = useToggle();

  const [selectedDeleteRow, setSelectedDeleteRow] =
    useState<BiomaterialType | null>(null);

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteRow) return;

    try {
      await deleteBiomaterial(selectedDeleteRow.id).unwrap();

      toast.success("Muvaffaqiyatli o‘chirildi");

      closeDeleteDialog();
      setSelectedDeleteRow(null);
      refetch();
    } catch (err) {
      toast.error("O‘chirishda xatolik yuz berdi");
      console.error("Delete error:", err);
    }
  };

  const columns = columnsBiomaterial({
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
    handleEditClick,
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
          <Button
            sx={{ display: { xs: "none", sm: "block" } }}
            variant="contained"
            onClick={openAdd}
          >
            + Add
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

      <ReusableDialog
        open={openAddDialog}
        onClose={() => {
          closeAdd();
          reset();
        }}
        onConfirm={handleSubmit(onSubmit)}
        title="Yangi biomaterial qo‘shish"
        confirmText={isCreating ? "Yaratilmoqda..." : "Yaratish"}
        cancelText="Bekor qilish"
        description={
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nomi (UZ)"
              fullWidth
              {...register("nameUz", { required: "Majburiy maydon" })}
              error={!!errors.nameUz}
              helperText={errors.nameUz?.message}
            />
            <TextField
              label="Nomi (RU)"
              fullWidth
              {...register("nameRu", { required: "Majburiy maydon" })}
              error={!!errors.nameRu}
              helperText={errors.nameRu?.message}
            />
          </Stack>
        }
      />
    </Box>
  );
};
