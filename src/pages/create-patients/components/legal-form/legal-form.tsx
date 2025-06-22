// import { Grid, TextField } from "@mui/material";
// import { Controller, useForm } from "react-hook-form";

// export const LegalForm = () => {
//   const { handleSubmit, control, reset } = useForm();

//   const onSubmit = (data: any) => {
//     console.log(data);
//     reset();
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Grid container spacing={4}>
//         <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
//           <Controller
//             name="name"
//             control={control}
//             render={({ field }) => (
//               <TextField fullWidth size="small" placeholder="Name" {...field} />
//             )}
//           />
//         </Grid>
//         <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
//           <Controller
//             name="shortName"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Short name"
//                 {...field}
//               />
//             )}
//           />
//         </Grid>
//         <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
//           <Controller
//             name="oked"
//             control={control}
//             render={({ field }) => (
//               <TextField fullWidth size="small" placeholder="Oked" {...field} />
//             )}
//           />
//         </Grid>
//         <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
//           <Controller
//             name="registrationDate"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Registration date"
//                 {...field}
//               />
//             )}
//           />
//         </Grid>
//         <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
//           <Controller
//             name="status"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Status"
//                 {...field}
//               />
//             )}
//           />
//         </Grid>
//         <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
//           <Controller
//             name="firstName"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Director name"
//                 {...field}
//               />
//             )}
//           />
//         </Grid>
//         <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
//           <Controller
//             name="lastName"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Director lastName"
//                 {...field}
//               />
//             )}
//           />
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

import { Grid, TextField } from "@mui/material";
import { CompanyType } from "../../../../shared/types/mis";

export const LegalForm = ({ formValues }: { formValues: CompanyType }) => {
  return (
    <Grid mb={"20px"} container spacing={4}>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <TextField
          fullWidth
          placeholder="INN"
          value={formValues.tin}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <TextField
          fullWidth
          placeholder="Name"
          value={formValues.name}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <TextField
          fullWidth
          placeholder="Short name"
          value={formValues.shortName}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <TextField
          fullWidth
          placeholder="Oked"
          value={formValues.oked}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <TextField
          fullWidth
          placeholder="Registration date"
          value={formValues.registrationDate}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <TextField
          fullWidth
          placeholder="Status"
          value={formValues.status}
        />
      </Grid>
    </Grid>
  );
};
