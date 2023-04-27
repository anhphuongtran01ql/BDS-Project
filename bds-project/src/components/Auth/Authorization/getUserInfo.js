import useAccessToken from "../UseAccessToken";
import parseJwt from "../ParseJwt";

export const useGetUserInfo = () => {
  const { accessToken } = useAccessToken();
  if (!accessToken) return null;
  const { username, userId, roles } = parseJwt(accessToken);
  return { username, userId, roles };
};

export const isLogged = () => {
  return localStorage.getItem("accessToken") != null ? true : false;
};

const IsRoles = ({ CurrentRoles, ValidRoles }) => {
  let ans = false;
  const intersection = CurrentRoles.filter((element) =>
    ValidRoles.includes(element)
  );
  if (intersection.length > 0) ans = true;
  return ans;
};
export { IsRoles };
