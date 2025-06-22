import {
  Box,
  Paper,
  Pagination,
  PaginationItem,
  useMediaQuery,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { colors } from "../../mui-config/colors";
import { useTheme } from "@mui/material/styles";

interface TableComponentProps {
  columns: GridColDef[];
  rows: any[];
  page: number;
  limit: number;
  total: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSelectRowsChange?: (selectedRows: any[]) => void;
  isRowSelectable?: (params: any) => boolean;
}

export const Table = ({
  columns,
  rows,
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  pageSizeOptions = [5, 10],
  onSelectRowsChange,
  isRowSelectable
}: TableComponentProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onPageChange(value - 1);
  };

  const handleChangePageSize = (event: SelectChangeEvent<number>) => {
    onLimitChange(Number(event.target.value));
  };

  return (
    <Paper
      sx={{
        width: "100%",
        flex: 1,
        borderTop: `1px solid ${colors.pureWhite}`,
        borderBottom: `1px solid ${colors.pureWhite}`,
        borderLeft: "none",
        borderRight: "none",
        borderRadius: "14px 14px 0 0",
        overflow: "hidden",
        overflowX: "auto",
      }}
    >
      <Box width={"100%"} sx={{ overflowX: "auto" }}>
        <Box minWidth={"600px"}>
          <DataGrid
            getRowId={(row) => row.id}
            // getRowHeight={() => "auto"}
            disableRowSelectionOnClick
            isRowSelectable={isRowSelectable}
            rows={rows}
            columns={columns}
            checkboxSelection
            hideFooterPagination
            hideFooterSelectedRowCount
            rowHeight={50}
            pageSizeOptions={[limit]}
            disableColumnMenu={false}
            onRowSelectionModelChange={(newSelection) => {
              const selectedIDs = new Set(newSelection.ids); 
              const selectedRows = rows.filter((row: any) =>
                selectedIDs.has(row.id)
              )
              onSelectRowsChange?.(selectedRows);
            }}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: `${colors.creamBg} !important`,
                color: `${colors.gray20}`,
                fontWeight: "normal",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: `${colors.creamBg} !important`,
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "normal",
                color: `${colors.gray20}`,
                fontSize: "13px",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: `${colors.creamBg} !important`,
              },
              "& .MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor: `${colors.creamBg} !important`,
              },
              "& .MuiDataGrid-cell": {
                color: `${colors.black}`,
                fontWeight: 400,
                fontSize: "13px",
              },
            }}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          mb={2}
          px={2}
          flexWrap="wrap"
        >
          <Box display={{ xs: "none", sm: "flex" }} alignItems="center" gap={1}>
            <Typography variant="body2" color={colors.gray20}>
              Showing
            </Typography>
            <Select
              size="small"
              value={limit}
              onChange={handleChangePageSize}
              sx={{
                fontSize: "13px",
                minWidth: 60,
                bgcolor: `${colors.grayBg}`,
                border: "none",
              }}
            >
              {pageSizeOptions.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="body2" color={colors.gray20}>
              out of {total}
            </Typography>
          </Box>

          <Pagination
            count={Math.ceil(total / limit)}
            page={page + 1}
            onChange={handleChangePage}
            shape="rounded"
            siblingCount={isMobile ? 0 : 1}
            boundaryCount={isMobile ? 1 : 2}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  width: 30,
                  height: 30,
                  fontSize: "14px",
                  borderRadius: "8px",
                  color: item.selected ? colors.black : colors.black,
                  backgroundColor: item.selected
                    ? colors.primary
                    : "transparent",
                }}
              />
            )}
          />
        </Box>
      </Box>
    </Paper>
  );
};
