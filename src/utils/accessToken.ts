let accessToken = "";

export const setAccessToken = (s: string) => {
  accessToken = s;
};

export const getAccessToken = () => {
  console.log(accessToken)
  return accessToken;
};