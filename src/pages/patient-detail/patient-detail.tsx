import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPatientQuery } from "../../redux/services/lis/users";
import { ChevronLeft } from "lucide-react";
import { colors } from "../../mui-config/colors";
import dayjs from "dayjs";
import { AnalyseTable } from "./models/analyse-tabel";

export const PatientDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetPatientQuery(Number(id));
  const navigate = useNavigate();

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
    <Box padding={"0 16px 16px 16px"}>
      <Stack bgcolor={colors.pureWhite} borderRadius={"16px"} padding={"16px"}>
        <Stack direction="row" alignItems="center" gap={"8px"} mb={"10px"}>
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
          <Typography>/</Typography>
          <Typography variant="h6" color="primary">
            Patient information
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={"10px"}>
          <Box
            minWidth={"300px"}
            border={"1px solid #ccc"}
            borderRadius={"10px"}
            padding={"16px"}
            textAlign={"center"}
          >
            <Avatar
              sx={{
                width: 66,
                height: 66,
                margin: "0 auto",
                bgcolor: colors.primary,
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              {(data?.firstName?.[0] || "").toUpperCase()}
            </Avatar>
            <Typography
              mx={"auto"}
              width={"100px"}
              borderRadius={"15px"}
              bgcolor={"#40c057"}
              mb={"8px"}
              fontSize={"14px"}
              color="white"
              fontWeight={"500"}
              variant="h6"
            >
              {data?.status}
            </Typography>
            <Typography mb={"8px"} variant="h4">
              {data?.firstName}
            </Typography>
            <Typography mb={"12px"} variant="h4">
              {data?.lastName}
            </Typography>
            <Stack direction={"row"} gap={"10px"} justifyContent={"center"}>
              <Typography variant="h6">Date of birth: </Typography>
              <Typography fontWeight={400} variant="h6">
                {data?.dateOfBirth
                  ? dayjs(data.dateOfBirth).format("DD.MM.YYYY")
                  : "-"}
              </Typography>
            </Stack>
          </Box>
          <Box
            border={"1px solid #ccc"}
            borderRadius={"10px"}
            padding={"20px"}
            width={"1000px"}
          >
            <Stack direction={"row"} gap={"260px"}>
              <Box>
                <Stack direction={"row"} gap={"10px"} mb={"12px"}>
                  <Typography variant="h6">Gender:</Typography>
                  <Typography fontWeight={400} variant="h6">
                    {data?.gender || "-"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={"10px"} mb={"12px"}>
                  <Typography variant="h6">Nationality:</Typography>
                  <Typography fontWeight={400} variant="h6">
                    {data?.nationality || "-"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={"10px"} mb={"12px"}>
                  <Typography variant="h6">Mobile:</Typography>
                  <Typography fontWeight={400} variant="h6">
                    {data?.mobile || "-"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={"10px"} mb={"12px"}>
                  <Typography variant="h6">Email:</Typography>
                  <Typography fontWeight={400} variant="h6">
                    {data?.email || "-"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={"10px"}>
                  <Typography variant="h6">Passport serial and number:</Typography>
                  <Typography fontWeight={400} variant="h6">
                    {data?.passportSerial && data?.passportNumber
                      ? `${data.passportSerial} ${data.passportNumber}`
                      : "-"}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Stack direction={"row"} gap={"10px"} mb={"12px"}>
                  <Typography variant="h6">Region:</Typography>
                  <Typography fontWeight={400} variant="h6">
                    {data?.region || "-"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={"10px"} mb={"12px"}>
                  <Typography variant="h6">District:</Typography>
                  <Typography fontWeight={400} variant="h6">
                    {data?.district || "-"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={"10px"} mb={"12px"}>
                  <Typography variant="h6">Address:</Typography>
                  <Typography fontWeight={400} variant="h6">
                    {data?.address || "-"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={"10px"} mb={"12px"}>
                  <Typography variant="h6">Phone number:</Typography>
                  <Typography fontWeight={400} variant="h6">
                    {data?.phone || "-"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={"10px"}>
                  <Typography variant="h6">PNFL:</Typography>
                  <Typography fontWeight={400} variant="h6">
                    {data?.pnfl || "-"}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
        <AnalyseTable patientId={Number(id)} />
      </Stack>
    </Box>
  );
};
