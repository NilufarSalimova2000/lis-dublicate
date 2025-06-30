import React from "react";
import {
  TextField,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import {
  AnalyseCreateT,
  ApplicationType,
  BiomaterialType,
  LoincType,
} from "../../../../shared/types/analyse";
import { TAnalyseCreateForm } from "../../create-patients";
import { colors } from "../../../../mui-config/colors";

type AnalysisFormProps = {
  index: number;
  analyse: TAnalyseCreateForm;
  loincList: LoincType[];
  biomaterialList: BiomaterialType[];
  analyseList: BiomaterialType[];
  meaUnitList: BiomaterialType[];
  applicationList: ApplicationType[];
  onRemove: () => void;
  control: Control<any>;
  register: UseFormRegister<any>;
  onSubmitData: (data: AnalyseCreateT) => void;
};

const financingOptions = [
  { label: "PK243", value: "PK243" },
  { label: "Бесплатно", value: "FREE" },
  { label: "В процессе", value: "IN_PROCESS" },
  { label: "Оплачен", value: "COMPLETED" },
];
const primaryConclusionOptions = [
  { label: "Не здоров", value: "UNHEALTHY" },
  { label: "Здоров", value: "HEALTHY" },
];
const priorityOptions = [
  { label: "Высокий", value: "HIGH" },
  { label: "Средний", value: "MEDIUM" },
  { label: "Низкий", value: "LOW" },
];

export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  index,
  loincList,
  biomaterialList,
  analyseList,
  meaUnitList,
  applicationList,
  onRemove,
  control,
  register,
}) => {
  return (
    <Box
      sx={{
        border: `1px solid ${colors.primary} `,
        p: 2,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <Typography variant="h5" color={colors.primary} gutterBottom>
        Анализ № {index + 1}
      </Typography>

      <Grid mb={"10px"} container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Controller
            name={`analyses.${index}.loincTypeId`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Loinc</InputLabel>
                <Select {...field} label="Loinc">
                  {loincList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.component}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Controller
            name={`analyses.${index}.fundingStatus`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Статус финансирования</InputLabel>
                <Select {...field} label="Статус финансирования">
                  {financingOptions.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Controller
            name={`analyses.${index}.initialConclusion`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Первичное заключение</InputLabel>
                <Select {...field} label="Первичное заключение">
                  {primaryConclusionOptions.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>

      <Typography mb={"10px"} fontSize={"16px"} variant="h6">
        Детали анализа
      </Typography>

      <Grid mb={"10px"} container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Controller
            name={`analyses.${index}.executionPriority`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Приоритет выполнения</InputLabel>
                <Select {...field} label="Приоритет выполнения">
                  {priorityOptions.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Controller
            name={`analyses.${index}.analyseDetails.analyseTypeId`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Метод исследования</InputLabel>
                <Select {...field} label="Метод исследования">
                  {analyseList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nameRu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Controller
            name={`analyses.${index}.applicationTypeId`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Тип обращения</InputLabel>
                <Select {...field} label="Тип обращения">
                  {applicationList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nameRu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Controller
            name={`analyses.${index}.analyseDetails.typeBiomaterialId`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Вид биоматериала</InputLabel>
                <Select {...field} label="Вид биоматериала">
                  {biomaterialList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nameRu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Controller
            name={`analyses.${index}.analyseDetails.measurementUnitId`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Единица измерения</InputLabel>
                <Select {...field} label="Единица измерения">
                  {meaUnitList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nameRu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            {...register(`analyses.${index}.sendDetails.numberOfSamples`)}
            placeholder="Число образцов"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <TextField
            {...register(`analyses.${index}.analyseDetails.comment`)}
            placeholder="Комментарий"
            fullWidth
          />
        </Grid>
      </Grid>

      <Typography mb={"10px"} fontSize={"16px"} variant="h6">
        Детали отправки
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            {...register(`analyses.${index}.sendDetails.senderOrganizationInn`)}
            placeholder="ИНН отправляющей организации"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            {...register(
              `analyses.${index}.sendDetails.senderOrganizationName`
            )}
            placeholder="Название организации"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            {...register(
              `analyses.${index}.sendDetails.fullNameOfReferringDoctor`
            )}
            placeholder="ФИО врача"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            {...register(`analyses.${index}.sendDetails.sendDateOfAnalyse`)}
            placeholder="Дата направления"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            {...register(`analyses.${index}.sendDetails.sampleArrivedDate`)}
            placeholder="Дата прибытия"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            {...register(
              `analyses.${index}.sendDetails.phoneNumberDeliveryMan`
            )}
            placeholder="Телефон доставщика"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            {...register(`analyses.${index}.sendDetails.fullNameOfDeliveryMan`)}
            placeholder="ФИО доставивший образцы"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            {...register(`analyses.${index}.sendDetails.fullNameOfRecipient`)}
            placeholder="ФИО принявший образцы"
            fullWidth
          />
        </Grid>
      </Grid>

      <Box mt={2} display="flex" gap={4}>
        <Button variant="outlined" color="error" onClick={onRemove}>
          Удалить анализ
        </Button>
      </Box>
    </Box>
  );
};
