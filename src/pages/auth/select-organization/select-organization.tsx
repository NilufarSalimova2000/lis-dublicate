import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAuthPayloadQuery } from "../../../redux/services/sso-auth/auth-payload";
import { SelectOrganizationT } from "../../../shared/types/auth";
import { useGetDepartmentsQuery } from "../../../redux/services/lis/organization";
import { colors } from "../../../mui-config/colors";

type FormValues = {
  organization: string;
  department: string;
};

const SelectOrganization = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>();
  const navigate = useNavigate();
  const selectedOrganizationId = watch("organization");

  const { data: authData, isLoading: isAuthLoading } = useGetAuthPayloadQuery();

  useEffect(() => {
    if (authData?.data) {
      const userData = {
        pinfl: authData.data.pinfl,
        fullName: authData.data.fullName,
        username: authData.data.username,
        email: authData.data.email,
        phone: authData.data.phone,
        photo: authData.data.photo,
        address: authData.data.address,
        inn: authData.data.inn,
        role: authData.data.role,
        permissions: authData.data.permissions,
        organizations: authData.data.organizations,
      };

      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [authData]);
  const { data: departmentsData, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery(
      { uuid: selectedOrganizationId },
      { skip: !selectedOrganizationId }
    );

  const onSubmit = (formData: FormValues) => {
    const selectedOrganization = authData?.data.organizations.find(
      (org: SelectOrganizationT) => org.uuid === formData.organization
    );

    const selectedDepartment = departmentsData?.find(
      (dep: SelectOrganizationT) => dep.id === Number(formData.department)
    );

    if (selectedOrganization) {
      localStorage.setItem("organization_uuid", formData.organization);
      localStorage.setItem(
        "organization",
        JSON.stringify(selectedOrganization)
      );

      if (selectedDepartment) {
        localStorage.setItem("department", JSON.stringify(selectedDepartment));
      } else {
        localStorage.removeItem("department");
      }

      navigate("/");
    } else {
      console.log("Organizatsiya topilmadi");
    }
  };

  return (
    <Stack
      minHeight={"100vh"}
      bgcolor={colors.creamBg}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        width={"400px"}
        borderRadius={"10px"}
        padding={"20px"}
        bgcolor={colors.pureWhite}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography mb={"16px"} textAlign={"center"} variant="h4">
            Select organization
          </Typography>

          <Typography mb={"3px"} variant="body1">
            Organization
          </Typography>

          <FormControl
            fullWidth
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <InputLabel id="org-label">Select</InputLabel>
            <Controller
              name="organization"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} labelId="org-label" label="Tanlang">
                  {!isAuthLoading &&
                    authData?.data.organizations.map(
                      (org: SelectOrganizationT) => (
                        <MenuItem key={org.id} value={org.uuid}>
                          {org.name}
                        </MenuItem>
                      )
                    )}
                </Select>
              )}
            />
          </FormControl>

          {departmentsData && departmentsData.length > 0 && (
            <>
              <Typography mb={"3px"} variant="body1">
                Department
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <InputLabel id="dep-label">Tanlang</InputLabel>
                <Controller
                  name="department"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} labelId="dep-label" label="Tanlang">
                      {!isDepartmentsLoading &&
                        departmentsData?.map((dep: SelectOrganizationT) => (
                          <MenuItem key={dep.id} value={dep.id}>
                            {dep.name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
              </FormControl>
            </>
          )}

          <Button
            type="submit"
            variant="outlined"
            sx={{
              textAlign: "center",
              width: "100%",
              fontWeight: "600",
              border: "none",
            }}
          >
            Подтвердить
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default SelectOrganization;
