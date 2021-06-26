let accessToken = "";

export const setAccessToken = (s: string) => {
  accessToken = s;
  localStorage.setItem('token', accessToken);
  
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined')
  accessToken=localStorage.getItem('token') as string;

  return accessToken;
};