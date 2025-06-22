import { Box, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IWarehouse } from "../../../../shared/types/warehouse";

export const CreateForm = () => {
  const { handleSubmit, control, reset } = useForm<IWarehouse>();

  const onSubmit = (data: IWarehouse) => {
    console.log(data);
    reset();
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField fullWidth size="small" {...field} />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
