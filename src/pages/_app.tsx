import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import '../styles.css'
import { useEffect, useState } from 'react';
import { setAccessToken } from '../utils/accessToken';


function MyApp({ Component, pageProps }: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}refresh_token`, {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
  )
}

export default MyApp
