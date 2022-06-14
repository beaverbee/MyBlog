/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import "../styles/globals.css";
import "antd/dist/antd.css";
import Head from "next/head";
import Script from "next/script";
import { Provider } from "../hooks/useBus";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCombineReducer } from "../hooks/useCombineReducer";
import { SET_LOADING } from "../config";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [userReducer, paramsReducer] = useCombineReducer();
  const [_,dispatch] = paramsReducer;
  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      dispatch({ type: SET_LOADING, value: true });
    };
    const handleRouterChangedComplete = (url) => {
      dispatch({ type: SET_LOADING, value: false });
    };
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouterChangedComplete);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouterChangedComplete);
    };
  }, [dispatch, router.events]);
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta
          name="description"
          content="This is Blog project based on React.js and Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="/js/easeljs.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/cicleMove.js" strategy="beforeInteractive"></Script>
      <Script src="/js/cicleLineCanvas.js"></Script>
      <Provider {...{ userReducer, paramsReducer }}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp;
