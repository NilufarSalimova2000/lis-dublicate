import Cookies from "js-cookie";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCreateLogoutMutation } from "../../redux/services/sso-auth/logout";
import styled from "@emotion/styled";
import { colors } from "../../mui-config/colors";
import { LogOut } from "lucide-react";

export const Logout = () => {
  const [createLogout, { isLoading }] = useCreateLogoutMutation();
  const navigate = useNavigate();

  const CustomButton = styled(Button)`
    background-color: ${colors.creamBg};
    color: ${colors.gray20};
    font-weight: 500;
    font-size: 14px;
    border-radius: 14px;
    padding: 10px 8px 10px 16px;
    width: 100%;
  `;

  const handleLogout = async () => {
    try {
      await createLogout(undefined).unwrap();
      Cookies.remove("access_token");
      localStorage.removeItem("user");
      localStorage.removeItem("organization_uuid");
      localStorage.removeItem("organization");
      localStorage.removeItem("department");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <CustomButton
        disabled={isLoading}
        onClick={handleLogout}
        sx={{ display: { md: "flex", sm: "none" } }}
        startIcon={<LogOut />}
      >
        {isLoading ? <CircularProgress /> : <>Logout</>}
      </CustomButton>
      <CustomButton
        onClick={handleLogout}
        disabled={isLoading}
        sx={{
          display: { md: "none", sm: "inline-flex" },
          width: "36px",
          height: "36px",
          padding: "8px",
          minWidth: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
        startIcon={<LogOut style={{ width: "18px", height: "18px" }} />}
      >
        {isLoading ? <CircularProgress /> : <></>}
      </CustomButton>
    </>
  );
};
