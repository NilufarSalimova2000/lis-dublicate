import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/main-layout";
import { Dashboard } from "./pages/dashboard";
import { Warehouse } from "./pages/warehouse";
import { CreateUser } from "./pages/create-user/create-user";
import { Login } from "./pages/auth/login";
import { Callback } from "./pages/auth/callback";
import { Users } from "./pages/users";
import SelectOrganization from "./pages/auth/select-organization/select-organization";
import { Patients } from "./pages/patients";
import { WFA } from "./pages/waiting-for-admission";
import { CreatePatients } from "./pages/create-patients";
import { Order } from "./pages/order";
import { Worksheets } from "./pages/worksheets";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/select-organization" element={<SelectOrganization />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="nurse/">
            <Route path="patients" element={<Order />} />
            <Route path="journal" element={<Worksheets />} />
          </Route>
          <Route path="appointment/">
            <Route path="patients" element={<Patients />} />
            <Route path="wfa" element={<WFA />} />
          </Route>
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="create" element={<CreateUser />} />
          <Route path="appointment/create" element={<CreatePatients />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
