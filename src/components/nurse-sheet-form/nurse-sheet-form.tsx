import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetAnalyseQuery } from "../../redux/services/lis/analyse";
import { BiomaterialType } from "../../shared/types/analyse";
import { useCreateNurseTestTubeMutation } from "../../redux/services/lis/nurse-test-tube";
import { NurseTestTubeRequestT } from "../../shared/types/users/nurse-test-tube";

interface FormValues {
  name: string;
  description: string;
  method: number[]; 
  patientIds: number[]; 
}

interface NurseSheetFormProps {
    orgId: number;
    selectedPatients: { id: number }[]; 
    onSubmitSuccess?: (data: any) => void;
  }

export const NurseSheetForm = ({
  orgId,
  selectedPatients,
  onSubmitSuccess,
}: NurseSheetFormProps) => {
  const { handleSubmit, control, reset } = useForm<FormValues>();
  const [options, setOptions] = useState<BiomaterialType[]>([]);

  const [createNurseTestTube, { isLoading }] = useCreateNurseTestTubeMutation();

  const { data: analyseData } = useGetAnalyseQuery({
    page: 0,
    limit: 100,
    search: { value: "" },
  });

  useEffect(() => {
    if (analyseData?.data?.list) {
      setOptions(analyseData.data.list);
    }
  }, [analyseData]);

  const onSubmit = (formData: any) => {
    const payload: NurseTestTubeRequestT = {
      orgId,
      title: formData.name,
      description: formData.description,
      analyseTypeIds: formData.method,
      patientIds: selectedPatients.map((p) => p.id.toString()),
    };
  
    createNurseTestTube(payload)
      .unwrap()
      .then((res) => {
        console.log("Yaratildi:", res);
        onSubmitSuccess?.(res);
        reset();
      })
      .catch((err) => {
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

      <Controller
        name="method"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormControl fullWidth size="small" margin="normal">
            <InputLabel>Research method</InputLabel>
            <Select
              {...field}
              multiple
              label="Research method"
              renderValue={(selected) =>
                options
                  .filter((item) => selected.includes(item.id))
                  .map((item) => item.nameUz)
                  .join(", ")
              }
            >
              {options.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <input
                    type="checkbox"
                    checked={field.value.includes(item.id)}
                    readOnly
                    style={{ marginRight: 8 }}
                  />
                  {item.nameUz}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
