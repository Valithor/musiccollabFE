import Cookies from 'universal-cookie';

let accessToken = "";

export const setAccessToken = (s: string) => {
  const cookies = new Cookies();
  accessToken = s;
  console.log(accessToken)
  console.log(accessToken!=="")
  localStorage.setItem('token', accessToken);
  if(accessToken!=="")
  cookies.set('jid', accessToken, {path: '/refresh_token', httpOnly: true});
  
};

export const getAccessToken = () => {
  console.log(accessToken)
  if (typeof window !== 'undefined')
  accessToken=localStorage.getItem('token') as string;

  return accessToken;
};