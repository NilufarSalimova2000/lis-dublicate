import { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Grid,
  Box,
} from "@mui/material";
import { TCitizenForm } from "../search-form";
import {
  useGetRegionsMutation,
  useLazyGetDistrictQuery,
} from "../../../../redux/services/lis/region";

export const CitizenForm = ({ formValues }: { formValues: TCitizenForm }) => {
  const [regionId, setRegionId] = useState(0);
  const [districtId, setDistrictId] = useState<number | "">("");

  const [getRegions, { data: regionsData, isLoading: regionsLoading }] =
    useGetRegionsMutation();

  const [fetchDistricts, { data: districtsData, isLoading: districtsLoading }] =
    useLazyGetDistrictQuery();

  useEffect(() => {
    getRegions({
      page: 0,
      limit: 100,
      search: { value: "" },
    });
  }, [getRegions]);

  const handleRegionChange = async (event: SelectChangeEvent) => {
    const selectedRegionId = Number(event.target.value);
    setRegionId(selectedRegionId);
    setDistrictId("");
    try {
      await fetchDistricts({ id: selectedRegionId }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistrictChange = (event: SelectChangeEvent) => {
    const selectedDistrictId = Number(event.target.value);
    setDistrictId(selectedDistrictId);
  };

  return (
    <Box mb={"20px"}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            placeholder="Фамилия"
            value={formValues.surnamelat || ""}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField placeholder="Имя" value={formValues.namelat || ""} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            placeholder="Отчество"
            value={formValues.patronymlat || ""}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            placeholder="Дата рождения"
            value={formValues.birth_date}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            placeholder="Национальность"
            value={formValues.nationality}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField placeholder="Пол" value={formValues.sex} fullWidth />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Регион</InputLabel>
            <Select
              value={String(regionId)}
              onChange={handleRegionChange}
              fullWidth
            >
              {regionsLoading ? (
                <MenuItem disabled>Yuklanmoqda...</MenuItem>
              ) : (
                regionsData?.data.list.map((region) => (
                  <MenuItem key={region.id} value={region.id}>
                    {region.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Район</InputLabel>
            <Select
              value={String(districtId)}
              onChange={handleDistrictChange}
              fullWidth
              disabled={!regionId}
            >
              {districtsLoading ? (
                <MenuItem disabled>Yuklanmoqda...</MenuItem>
              ) : (
                districtsData?.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField placeholder="Адрес" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField placeholder="Номер телефона" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            placeholder="Дата использования личных данных пациента"
            InputLabelProps={{ shrink: true }}
            type="date"
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};
