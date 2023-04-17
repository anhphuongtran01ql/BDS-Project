import { useState } from "react";

export default function useAccessToken() {
  const getAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== undefined) return accessToken;
  };

  const [accessToken, setAccessToken] = useState(getAccessToken());

  const saveAccessToken = (userAccessToken) => {
    localStorage.setItem("accessToken", userAccessToken);
    setAccessToken(localStorage.getItem("accessToken"));
  };

  return {
    setAccessToken: saveAccessToken,
    accessToken,
  };
}
