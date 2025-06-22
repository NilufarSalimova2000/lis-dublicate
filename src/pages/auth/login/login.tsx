import { Box, Button, Stack, Typography } from "@mui/material";
import { colors } from "../../../mui-config/colors";
import { ArrowRight, LockKeyhole } from "lucide-react";
import {
  generateRandomString,
  pkceChallengeFromVerifier,
} from "../../../lib/common";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const token = Cookies.get("access_token");
  if (token) {
    return <Navigate to={"/"} />;
  }

  const redirectToSSO = async () => {
    const state = generateRandomString();
    const codeVerifier = generateRandomString();
    const codeChallenge = await pkceChallengeFromVerifier(codeVerifier);

    localStorage.setItem("pkce_state", state);
    localStorage.setItem("pkce_code_verifier", codeVerifier);

    const url = `${
      import.meta.env.VITE_SSO_AUTHORIZATION_ENDPOINT
    }?response_type=code&client_id=${encodeURIComponent(
      import.meta.env.VITE_SSO_CLIENT_ID!
    )}&state=${encodeURIComponent(state)}&redirect_uri=${encodeURIComponent(
      import.meta.env.VITE_SSO_REDIRECT_URI!
    )}&code_challenge=${encodeURIComponent(
      codeChallenge
    )}&code_challenge_method=S256`;

    console.log("SSO redirect URL:", url);
    window.location.href = url;
  };
  return (
    <Box
      minHeight={"100vh"}
      bgcolor={colors.creamBg}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width={"400px"}
        borderRadius={"18px"}
        padding={"30px"}
        mx={"auto"}
        bgcolor={colors.pureWhite}
        textAlign={"center"}
      >
        <Typography mb={"20px"} variant="h5">
          Вход в систему
        </Typography>
        <Typography mb={"20px"} variant="body2">
          Для входа используйте вашу учетную запись SSO
        </Typography>
        <Button
          onClick={redirectToSSO}
          sx={{ fontWeight: 600, px: "20px", py: "10px", mb: "20px" }}
          variant="contained"
          startIcon={<LockKeyhole />}
          endIcon={<ArrowRight />}
        >
          Войти через SSO
        </Button>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"8px"}
        >
          <Typography variant="body2" fontSize={"12px"}>
            Проблемы с входом?
          </Typography>
          <a style={{ fontSize: "12px", color: "#c2e66e" }} href="#">
            Свяжитесь с поддержкой
          </a>
        </Stack>
      </Box>
    </Box>
  );
};
