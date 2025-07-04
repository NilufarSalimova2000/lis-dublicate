import { useState } from "react";
import { Button, Box, Stack } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { organizationId } from "../../shared/constants";
import { CompanyType } from "../../shared/types/mis";
import { SearchForm, TCitizenForm } from "./components/search-form";
import { AnalysisForm } from "./components/analyse-form";
import { AnalyseCreateT } from "../../shared/types/analyse";
import {
  AnalyseService,
  useGetLoincQuery,
} from "../../redux/services/lis/analyse";
import { colors } from "../../mui-config/colors";
import { BiomaterialService } from "../../redux/services/lis/analyse/biomaterials";
import { MeasurementUnitService } from "../../redux/services/lis/measurement-unit";

export type TAnalyseCreateForm = Omit<
  AnalyseCreateT,
  "analyseNameOfLoinc" | "analyseCodeOfLoinc"
> & { loincTypeId: number };

type TPatient = TAnalyseCreateForm["patient"];

const initPatient: TPatient = {
  email: "",
  passportSerial: "",
  passportNumber: "",
  address: "",
  pnfl: "",
  dateOfBirth: "",
  districtId: 0,
  firstName: "",
  gender: false,
  isAnonymous: false,
  lastName: "",
  middleName: "",
  nationality: "",
  photo: "",
  regionId: 0,
  username: "",
};

const initAnalyse: TAnalyseCreateForm = {
  fundingStatus: "",
  organizationId: organizationId,
  initialConclusion: "",
  applicationTypeId: 0,
  loincTypeId: 0,
  analyseDetails: {
    comment: "",
    analyseTypeId: 0,
    executionPriority: "",
    measurementUnitId: 0,
    typeBiomaterialId: 0,
  },
  patient: {
    email: "",
    passportSerial: "",
    passportNumber: "",
    address: "",
    pnfl: "",
    dateOfBirth: "",
    districtId: 0,
    firstName: "",
    gender: false,
    isAnonymous: false,
    lastName: "",
    middleName: "",
    nationality: "",
    photo: "",
    regionId: 0,
    username: "",
  },
  sendDetails: {
    sendDateOfAnalyse: "",
    sampleArrivedDate: "",
    numberOfSamples: 1,
    fullNameOfRecipient: "",
    fullNameOfDeliveryMan: "",
    fullNameOfReferringDoctor: "",
    phoneNumberDeliveryMan: "",
    senderOrganizationInn: "",
    senderOrganizationName: "",
  },
};

export const CreatePatients = () => {
  const [_createAnalyseList, setCreateAnalyseList] = useState<AnalyseCreateT[]>(
    []
  );
  const [createAnalyse] = AnalyseService.useCreateAnalyseMutation();

  const { data: loincListRes } = useGetLoincQuery({
    id: organizationId,
    page: 0,
    limit: 100,
    search: { value: "" },
  });
  const loincList = loincListRes?.data.list ?? [];

  const { data: biomaterialListR } = BiomaterialService.useGetBiomaterialQuery({
    page: 0,
    limit: 100,
    search: { value: "" },
  });
  const biomaterialList = biomaterialListR?.data.list ?? [];

  const { data: analyseListR } = AnalyseService.useGetAnalyseQuery({
    page: 0,
    limit: 100,
    search: { value: "" },
  });

  const analyseList = analyseListR?.data.list ?? [];

  const { data: meaUnitListR } =
    MeasurementUnitService.useGetMeasurementUnitQuery({
      page: 0,
      limit: 100,
      search: { value: "" },
    });

  const meaUnitList = meaUnitListR?.data.list ?? [];

  const { data: applicationListR } = AnalyseService.useGetApplicationQuery({
    page: 0,
    limit: 100,
    search: { value: "" },
  });

  const applicationList = applicationListR?.data.list ?? [];

  const { control, register, handleSubmit } = useForm<{
    analyses: TAnalyseCreateForm[];
  }>({
    defaultValues: { analyses: [initAnalyse] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "analyses",
  });

  const [patientInfo, setPatientInfo] = useState<TPatient>(initPatient);

  const formatDate = (date: string): string => {
    const d = new Date(date);
    const offset = d.getTimezoneOffset() / 60;
    const formattedDate = d.toISOString().slice(0, 19);

    const timezoneOffset =
      offset >= 0
        ? `+${String(Math.abs(offset)).padStart(2, "0")}:00`
        : `-${String(Math.abs(offset)).padStart(2, "0")}:00`;

    return `${formattedDate}${timezoneOffset}`;
  };

  const handleSearchFormSubmit = (data: CompanyType | TCitizenForm) => {
    // console.log("handleSearchFormSubmit", data);

    if ("sex" in data) {
      setPatientInfo((prev) => ({
        ...prev,
        firstName: data.namelat,
        middleName: data.patronymlat,
        lastName: data.surnamelat,
        gender: data.sex === "Erkak",
        dateOfBirth: formatDate(data.birth_date),
        districtId: data.birthcountryid,
        nationality: data.nationality,
        photo: data.photo,
        username: data.current_pinpp,
        pnfl: data.current_pinpp,
      }));
    }
  };

  const handleAnalyseFormSubmit = (index: number) => (data: AnalyseCreateT) => {
    setCreateAnalyseList((prev) => {
      const updated = [...prev];
      updated[index] = data;
      return updated;
    });
  };

  const handleSubmitAll = async (data: { analyses: TAnalyseCreateForm[] }) => {
    // console.log(data);

    await Promise.all(
      data.analyses.map(({ loincTypeId, ...analyse }) => {
        const loincType = loincList.find((itm) => itm.id === loincTypeId);

        if (loincType) {
          return createAnalyse({
            ...analyse,
            analyseNameOfLoinc: loincType.component,
            analyseCodeOfLoinc: loincType.loincNumber,
            patient: patientInfo,
          });
        }
      })
    );
  };

  return (
    <Box padding={{ sm: "0 28px 28px 28px", xs: "0 16px 16px 16px" }}>
      {" "}
      <Stack bgcolor={colors.pureWhite} borderRadius={"16px"} padding={"28px"}>
        <Box component="form" onSubmit={handleSubmit(handleSubmitAll)} p={2}>
          <SearchForm onFormUpdate={handleSearchFormSubmit} />

          {fields.map((analyse, index) => (
            <AnalysisForm
              key={analyse.id}
              index={index}
              analyse={analyse}
              loincList={loincList}
              biomaterialList={biomaterialList}
              analyseList={analyseList}
              meaUnitList={meaUnitList}
              applicationList={applicationList}
              register={register}
              control={control}
              onRemove={() => remove(index)}
              onSubmitData={handleAnalyseFormSubmit(index)}
            />
          ))}

          <Box mt={2}>
            <Button variant="outlined" onClick={() => append(initAnalyse)}>
              Добавить новый анализ
            </Button>
          </Box>

          <Box mt={2}>
            <Button variant="contained" type="submit">
              Create
            </Button>
          </Box>
        </Box>{" "}
      </Stack>{" "}
    </Box>
  );
};
