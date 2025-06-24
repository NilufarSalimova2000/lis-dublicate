import { Box, IconButton, Stack, Typography } from "@mui/material";
import { AnalyseTable } from "../../components/analyse-tabel";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../mui-config/colors";
import { ChevronLeft } from "lucide-react";

export const Analyses = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Box padding={"0 16px 16px 16px"}>
      <Stack bgcolor={colors.pureWhite} borderRadius={"16px"} padding={"16px"}>
        <Stack direction="row" alignItems="center">
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
          </IconButton>
          <Typography
            variant="h6"
            onClick={() => navigate("/appointment/patients")}
            sx={{ cursor: "pointer" }}
          >
            Patients
          </Typography>
        </Stack>
        <AnalyseTable patientId={Number(id)} />
      </Stack>
    </Box>
  );
};
