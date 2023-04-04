const authHeader = () => {
  let user = JSON.parse(localStorage.getItem("userDetails"));
  if (user && user.access_token) {
    return {
      headers: { Authorization: `Bearer ${user.access_token}` },
    };
  } else {
    return {};
  }
};
export { authHeader };
