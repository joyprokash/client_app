import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
import Router from 'next/router'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    //console.log(pageProps.protected+" - "+localStorage.getItem('token'))
    if(pageProps.protected && localStorage.getItem('token') === null) {
      Router.push('/auth/login')
    }
  }, []);

  return <Component {...pageProps} />
}

export default MyApp

