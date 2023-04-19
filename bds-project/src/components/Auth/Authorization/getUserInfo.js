import useAccessToken from "../UseAccessToken";
import parseJwt from "../ParseJwt";

const GetCurrentUsername = () => {
  const { accessToken } = useAccessToken();
  let userIdentity = parseJwt(accessToken);
  return userIdentity.username;
};
export { GetCurrentUsername };

const GetCurrentId = () => {
  const { accessToken } = useAccessToken();
  let userIdentity = parseJwt(accessToken);
  return userIdentity.userId;
};
export { GetCurrentId };

const GetCurrentRoles = () => {
  const { accessToken } = useAccessToken();
  let userIdentity = parseJwt(accessToken);
  return userIdentity.roles;
};
export { GetCurrentRoles };

const IsRoles = ({ CurrentRoles, ValidRoles }) => {
  let ans = false;
  const intersection = CurrentRoles.filter((element) =>
    ValidRoles.includes(element)
  );
  if (intersection.length > 0) ans = true;
  return ans;
};
export { IsRoles };
