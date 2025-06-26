import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useCreateLabrantTestTubeMutation } from "../../../redux/services/lis/labrant-test-tube";
import { toast } from "react-toastify";
import { LabrantTestTubeT } from "../../../shared/types/labrant-test-tube";

interface FormValues {
  name: string;
  description: string;
}

interface labWorksheetFormProps {
  orgId: number;
  selectedPatients: { id: number }[];
  onSubmitSuccess?: (data: LabrantTestTubeT) => void;
}

export const LabWorkSheetForm = ({
  onSubmitSuccess,
  selectedPatients,
}: labWorksheetFormProps) => {
  const { handleSubmit, control, reset } = useForm<FormValues>();
  const [createNurseTestTube, { isLoading }] =
    useCreateLabrantTestTubeMutation();

  const onSubmit = (formData: FormValues) => {
    const analyseIds = selectedPatients.map((p) => p.id.toString());

    const payload = {
      title: formData.name,
      description: formData.description,
      analyseIds,
    };

    createNurseTestTube(payload)
      .unwrap()
      .then((res) => {
        onSubmitSuccess?.(res);
        reset();
      })
      .catch((err) => {
        toast.error("Xatolik yuz berdi");
        console.error("Xatolik:", err);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            fullWidth
            size="small"
            placeholder="Name"
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            fullWidth
            size="small"
            placeholder="Description"
            margin="normal"
            {...field}
          />
        )}
      />

      <Box mt={2}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Yaratilmoqda..." : "Create"}
        </Button>
      </Box>
    </Box>
  );
};
