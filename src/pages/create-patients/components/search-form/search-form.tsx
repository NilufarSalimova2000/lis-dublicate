// import {
//   Button,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   TextField,
// } from "@mui/material";
// import { Controller, useForm } from "react-hook-form";
// import { SitizenForm } from "../citizen-form";
// import { LegalForm } from "../legal-form";

// export const SearchForm = () => {
//   const { handleSubmit, control, reset, watch } = useForm({
//     defaultValues: {
//       registrationType: "pnfl",
//       data: "",
//     },
//   });

//   const registrationType = watch("registrationType");
//   const data = watch("data") || "";

//   const isValidInput =
//     (registrationType === "pnfl" && /^\d{14}$/.test(data)) ||
//     (registrationType === "inn" && /^\d{9}$/.test(data));

//   const onSubmit = (formData) => {
//     console.log("Search:", formData);
//     // optional: formani tozalash
//     // reset({ registrationType: "pnfl", data: "" });
//   };

//   return (
//     <Stack>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Grid marginBottom={"20px"} container spacing={4}>
//           <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
//             <Controller
//               name="registrationType"
//               control={control}
//               render={({ field }) => (
//                 <FormControl fullWidth size="small">
//                   <InputLabel>Registration type</InputLabel>
//                   <Select {...field} label="Gender">
//                     <MenuItem value="pnfl">
//                       personal identification number of individuals
//                     </MenuItem>
//                     <MenuItem value="inn">INN</MenuItem>
//                     <MenuItem value="birth">Birth certificate</MenuItem>
//                   </Select>
//                 </FormControl>
//               )}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
//             <Controller
//               name="data"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   fullWidth
//                   size="small"
//                   placeholder="Data"
//                   {...field}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
//             <Button type="submit" variant="contained" disabled={!isValidInput}>
//               Search
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       {registrationType === "pnfl" && isValidInput && (
//         <SitizenForm pnfl={data} />
//       )}
//       {registrationType === "inn" && isValidInput && <LegalForm inn={data} />}
//     </Stack>
//   );
// };

import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  Stack,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import { CitizenType, CompanyType } from "../../../../shared/types/mis";
import {
  useLazyGetCitizenQuery,
  useLazyGetLegalEntityQuery,
} from "../../../../redux/services/lis/mis";
import { CitizenForm } from "../citizen-form";
import { LegalForm } from "../legal-form";

type Sex = "Erkak" | "Ayol";
export type TCitizenForm = Omit<CitizenType, "sex"> & { sex: Sex };

export const SearchForm = ({
  onFormUpdate,
}: {
  onFormUpdate: (values: CompanyType | TCitizenForm) => void;
}) => {
  const [searchType, setSearchType] = useState<"pnfl" | "inn" | "passport">(
    "pnfl"
  );
  const [searchValue, setSearchValue] = useState("");

  const [citizenFormVals, setCitizenFormVals] = useState<TCitizenForm>({
    transaction_id: 0,
    current_pinpp: "",
    pinpps: [],
    current_document: "",
    documents: [],
    surnamelat: "",
    namelat: "",
    patronymlat: "",
    surnamecyr: "",
    namecyr: "",
    patronymcyr: "",
    engsurname: "",
    engname: "",
    birth_date: "",
    birthplace: "",
    birthcountry: "",
    birthcountryid: 0,
    livestatus: 0,
    nationality: "",
    nationalityid: 0,
    citizenship: "",
    citizenshipid: 0,
    sex: "Ayol",
    photo: "",
  });

  const [legalformVals, setLegalformVals] = useState<CompanyType>({
    name: "",
    shortName: "",
    tin: "",
    oked: "",
    registrationDate: "",
    registrationNumber: "",
    reregistrationDate: "",
    status: 0,
    statusUpdated: null,
    taxStatus: null,
    taxMode: 0,
    vatNumber: 0,
    vatRegistrationDate: null,
  });

  const [
    fetchCitizen,
    { data: citizenData, error: citizenError, isLoading: citizenLoading },
  ] = useLazyGetCitizenQuery();

  const [
    fetchLegal,
    { data: legalData, error: legalError, isLoading: legalLoading },
  ] = useLazyGetLegalEntityQuery();

  const handleSearch = async () => {
    if (isValidInput()) {
      if (searchType === "pnfl") {
        await fetchCitizen({ nnuzb: searchValue, photo: "Y" })
          .unwrap()
          .then(() => {})
          .catch((err) => {
            console.error("Error during fetching citizen data:", err);
          });
      } else if (searchType === "inn") {
        await fetchLegal({ tin: searchValue })
          .unwrap()
          .then(() => {})
          .catch((err) => {
            console.error("Error during fetching legal data:", err);
          });
      }
    }
  };

  useEffect(() => {
    if (citizenData?.data?.length) {
      const person = citizenData.data[0];
      const newValues: TCitizenForm = {
        ...citizenFormVals,
        surnamelat: person.surnamelat || "",
        namelat: person.namelat || "",
        patronymlat: person.patronymlat || "",
        birth_date: person.birth_date || "",
        nationality: person.nationality || "",
        sex: person.sex === 1 ? "Erkak" : "Ayol",
        photo: person.photo || "",
        current_pinpp: person.current_pinpp,
      };
      setCitizenFormVals((prevState) => ({ ...prevState, ...newValues }));
      onFormUpdate(newValues);
    }
  }, [citizenData]);

  useEffect(() => {
    if (legalData?.company) {
      let newData = {
        ...legalformVals,
        tin: legalData.company.tin || "",
        name: legalData.company.name || "",
        shortName: legalData.company.shortName || "",
      };

      setLegalformVals((prevState) => ({
        ...prevState,
        ...newData,
      }));
      onFormUpdate(newData);
    }
  }, [legalData]);

  const placeholders = {
    pnfl: "Введите ПИНФЛ",
    inn: "Введите ИНН",
    passport: "Серия и номер",
  };

  const isValidInput = () => {
    if (searchType === "pnfl") return /^\d{14}$/.test(searchValue);
    if (searchType === "inn") return /^\d{9}$/.test(searchValue);
    if (searchType === "passport") return /^[A-Z]{3}\d{7}$/.test(searchValue);
    return false;
  };

  return (
    <Stack>
      <Grid marginBottom={"20px"} container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Вид регистрации</InputLabel>
            <Select
              value={searchType}
              onChange={(e) =>
                setSearchType(e.target.value as "pnfl" | "inn" | "passport")
              }
            >
              <MenuItem value="pnfl">
                Идентификационный номер гражданина в Республике Узбекистан
                (ПИНФЛ)
              </MenuItem>
              <MenuItem value="inn">ИНН</MenuItem>
              <MenuItem value="passport">Свидетельство о рождении</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <TextField
            fullWidth
            size="small"
            label="Данные"
            variant="outlined"
            placeholder={placeholders[searchType]}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <Button
            variant="contained"
            disabled={!isValidInput() || citizenLoading || legalLoading}
            onClick={handleSearch}
          >
            Поиск
          </Button>
        </Grid>
      </Grid>

      {citizenLoading || legalLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : null}
      {citizenError && (
        <p>Xatolik yuz berdi (Fuqarolar): {JSON.stringify(citizenError)}</p>
      )}
      {legalError && (
        <p>Xatolik yuz berdi (Yuridik): {JSON.stringify(legalError)}</p>
      )}

      {/* Formga avtomatik to‘ldirish */}
      {searchType === "pnfl" && <CitizenForm formValues={citizenFormVals} />}
      {searchType === "inn" && <LegalForm formValues={legalformVals} />}
    </Stack>
  );
};
