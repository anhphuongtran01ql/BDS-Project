const authHeader = () => {
  const tokens = JSON.parse(window.localStorage.getItem("accessToken"));

  if (tokens) {
    return {
      headers: { Authorization: `Bearer ${tokens}` },
    };
  } else {
    return {};
  }
};

export { authHeader };
