import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { colors } from "../../mui-config/colors";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/crud-slice";
import { UsersT } from "../../redux/type";

export const CreateUser = () => {
  const { handleSubmit, control, reset } = useForm<UsersT>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: UsersT) => {
    const newUser = {
      ...data,
      id: Date.now(),
    };

    dispatch(addUser(newUser));
    reset();
    navigate("/");
  };
  return (
    <Box padding={{ sm: "28px", xs: "16px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          bgcolor={colors.pureWhite}
          borderRadius={"16px"}
          padding={"28px"}
        >
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Name"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    placeholder="Last name"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Age"
                    type="number"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Email"
                    type="email"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Address"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Phone Number"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Gender</InputLabel>
                    <Select {...field} label="Gender">
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Language</InputLabel>
                    <Select {...field} label="Language">
                      <MenuItem value="uz">Uzbek</MenuItem>
                      <MenuItem value="ru">Russian</MenuItem>
                      <MenuItem value="en">English</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ maxWidth: "100px", textTransform: "none" }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Box>
  );
};
