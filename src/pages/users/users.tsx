import { Box, CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetUsersMutation } from "../../redux/services/lis/users";
import { Table } from "../../ui/table";
import { columnsUser } from "./models/columns";
import { organizationId } from "../../shared/constants";
import { colors } from "../../mui-config/colors";
import { useToggle } from "../../hooks/useToggle";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchInput } from "../../components/search-input";

export const Users = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [menuRowId, setMenuRowId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const [getUsers, { data, isLoading, error }] = useGetUsersMutation();

  useEffect(() => {
    if (organizationId !== null) {
      getUsers({
        orgId: organizationId,
        page,
        limit,
        search: { value: debouncedSearch },
      });
    }
  }, [getUsers, organizationId, page, limit, debouncedSearch]);

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

  const columns = columnsUser({
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
    </Box>
  );
};
