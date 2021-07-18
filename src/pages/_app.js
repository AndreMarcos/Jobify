import '../../styles/globals.css'

import Head from "next/head";
import { config, dom } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return( 
    <>
      <Head><style>{dom.css()}</style></Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
