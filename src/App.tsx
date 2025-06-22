import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/main-layout";
import { Login } from "./pages/auth/login";
import { Callback } from "./pages/auth/callback";
import SelectOrganization from "./pages/auth/select-organization/select-organization";
import { Router } from "./router/router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/select-organization" element={<SelectOrganization />} />
        <Route path="/" element={<MainLayout />}>
            {Router.map(({id, path, component: Component}) => (
                <Route key={id} index={!path && true} path={path} element={<Component/>} />
            ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
