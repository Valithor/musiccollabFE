import Cookies from 'universal-cookie';

let accessToken = "";

export const setAccessToken = (s: string) => {
  const cookies = new Cookies();
  accessToken = s;
  console.log(accessToken)
  console.log(accessToken!=="")
  cookies.set('jid', accessToken, {path: '/refresh_token', httpOnly: true});
  
};

export const getAccessToken = () => {
  console.log(accessToken)
  return accessToken;
};