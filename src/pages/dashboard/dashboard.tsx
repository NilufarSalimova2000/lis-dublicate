import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { colors } from "../../mui-config/colors";
import { Table } from "../../ui/table";
import { dashboardColumns } from "./models/columns";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { deleteUser } from "../../redux/crud-slice";
import { useToggle } from "../../hooks/useToggle";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.crud.todoList);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const total = todoList.length;

  const {
    open: openDelete,
    handleOpen: openDeleteDialog,
    handleClose: closeDeleteDialog,
  } = useToggle();

  const {
    open: openView,
    handleOpen: openViewDialog,
    handleClose: closeViewDialog,
  } = useToggle();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
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

  const handleDeleteClick = (row: any) => {
    setSelectedRow(row);
    openDeleteDialog();
    handleCloseMenu();
  };

  const handleConfirmDelete = () => {
    if (selectedRow?.id != null) {
      dispatch(deleteUser(selectedRow.id));
    }
    closeDeleteDialog();
    setSelectedRow(null);
  };

  const handleCancelDelete = () => {
    closeDeleteDialog();
    setSelectedRow(null);
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

  const columns = dashboardColumns({
    anchorEl: menuAnchorEl,
    menuRowId,
    handleOpenMenu,
    handleCloseMenu,
    handleDeleteClick,
    handleViewClick,
    openDelete,
    openView,
    selectedRow,
    handleCancelDelete,
    handleConfirmDelete,
    handleCloseView,
  });

  const paginatedRows = todoList.slice((page - 1) * limit, page * limit);

  return (
    <Box padding={{ sm: "0 28px 28px 28px", xs: "0 16px 16px 16px" }}>
      <Stack bgcolor={colors.pureWhite} borderRadius={"16px"} padding={"16px"}>
        <Stack
          marginBottom={"20px"}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ maxWidth: "224px" }}
            size="small"
            placeholder="Search"
          />
          <Link style={{ textDecoration: "none" }} to={"/create"}>
            <Button
              sx={{ display: { xs: "none", sm: "block" } }}
              variant="contained"
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
          </Link>
        </Stack>
        <Table
          columns={columns}
          rows={paginatedRows}
          page={page}
          limit={limit}
          total={total}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </Stack>
    </Box>
  );
};
