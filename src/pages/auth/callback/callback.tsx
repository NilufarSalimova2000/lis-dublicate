import { useEffect } from "react";
import Cookies from "js-cookie";
import { Alert, Stack, Typography } from "@mui/material";
import { useLoginMutation } from "../../../redux/services/sso-auth/service";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../mui-config/colors";

export const Callback = () => {
  const [createLogin] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const error = params.get("error");

      const storedState = localStorage.getItem("pkce_state");
      const verifier = localStorage.getItem("pkce_code_verifier");

      if (error || !code || state !== storedState) {
        <Alert severity="error">Ошибка авторизации</Alert>;
        return;
      }

      try {
        const data = new URLSearchParams({
          code,
          claims: "organization",
          client_id: import.meta.env.VITE_SSO_CLIENT_ID!,
          redirect_uri: import.meta.env.VITE_SSO_REDIRECT_URI!,
          code_verifier: verifier!,
          grant_type: "authorization_code",
        });

        const res = await createLogin(data).unwrap();

        if (res?.access_token) {
          Cookies.set("access_token", res.access_token);
          localStorage.removeItem("pkce_state");
          localStorage.removeItem("pkce_code_verifier");
          navigate("/select-organization");
        } else {
          console.log(error, "Token olishda xatolik yuz berdi");
        }
      } catch (err) {
        console.log("Qayta kiring!");
      }
    };

    getToken();
  }, []);

  return (
    <Stack
      minHeight={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      bgcolor={colors.creamBg}
    >
      <Typography variant="body1">Проверка данных...</Typography>
    </Stack>
  );
};
