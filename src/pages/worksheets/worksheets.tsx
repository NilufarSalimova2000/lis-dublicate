import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { organizationId } from "../../shared/constants";
import { useToggle } from "../../hooks/useToggle";
import { Table } from "../../ui/table";
import { Search } from "lucide-react";
import { colors } from "../../mui-config/colors";
import { Link } from "react-router-dom";
import { columnsWorksheets } from "./models/columns";
import { useGetNurseTestTubeMutation } from "../../redux/services/lis/nurse-test-tube";

export const Worksheets = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const [getPatients, { data, isLoading, error }] =
    useGetNurseTestTubeMutation();

  useEffect(() => {
    if (organizationId !== null) {
      getPatients({
        orgId: organizationId,
        page,
        limit,
        search: { value: "" },
      });
    }
  }, [getPatients, organizationId, page, limit]);

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

  const columns = columnsWorksheets({
    anchorEl: menuAnchorEl,
    menuRowId,
    handleOpenMenu,
    handleCloseMenu,
    handleViewClick,
    openView,
    selectedRow,
    handleCloseView,
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
    <Box padding={{ sm: "28px", xs: "16px" }}>
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
          <Link style={{ textDecoration: "none" }} to={"/appointment/create"}>
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
