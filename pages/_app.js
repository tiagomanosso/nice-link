import { DefaultSeo } from 'next-seo';
import Head from "next/head";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";
import Layout from "../components/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import { blueTheme, darkTheme, lightBlueTheme, lightTheme, purpleDarkTheme } from "../styles/theme.config";

function MyApp({ Component, pageProps }) {
    const darkMode = useDarkMode(false, { storageKey: null, onChange: null })
    const [isMounted, setIsMounted] = useState(false)
    const [bioData] = useState(pageProps.bioData);
    const [seoData] = useState(pageProps.seoData);
    const [isLoading, setLoading] = useState(true);

    const gaMeasurementId = process.env.NEXT_GOOGLE_MEASUREMENT_ID || 'G-C4JYBPG87K';
    const gaMeasurementIdMinisite = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-WY9WHDZGQQ';


    usePageViews({ gaMeasurementId });
    useEffect(() => {
        if (bioData && bioData?.name !== '') {
            setLoading(false);
        }
        setIsMounted(true);
    }, [])

    let theme = darkMode.value ? darkTheme : lightTheme;

    if (isLoading) {
        // return <></>;
        return (
            <>
                <GoogleAnalytics trackPageViews />
                <ThemeProvider theme={theme} >
                    <Head>
                        <meta content="width=device-width, initial-scale=1" name="viewport" />
                        <link rel="icon" href="/favicon.png" />
                    </Head>
                    <GlobalStyle />

                    <Layout>
                        <DefaultSeo
                            canonical={seoData?.openGraph?.url}
                            {...seoData}
                            additionalMetaTags={[{
                                name: 'keywords',
                                content: seoData?.openGraph?.keywords,
                            },
                            {
                                name: 'twitter:image',
                                content: seoData?.openGraph?.images[0].url
                            },
                            {
                                name: 'twitter:title',
                                content: seoData?.openGraph?.title,
                            },
                            {
                                name: 'twitter:description',
                                content: seoData?.openGraph?.description,
                            },
                            {
                                httpEquiv: 'x-ua-compatible',
                                content: 'IE=edge; chrome=1'
                            }]}
                        />
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Carregando...</p>
                        </div>
                    </Layout>
                </ThemeProvider>
            </>
        );
    }

    switch (bioData?.color) {
        case 'rgb(7 68 155 / 95%)':
            theme = blueTheme;
            break;
        case 'rgb(4 41 64 )':
            theme = blueTheme;
            break;
        case 'rgb(60 91 135 / 90%)':
            theme = lightBlueTheme;
            break;
        case 'rgb(156 135 246 / 70%)':
            theme = purpleDarkTheme;
            break;
        case 'rgb(49 32 160 / 80%)':
            theme = purpleDarkTheme;
            break;
        default:
            break;
    }
    return (
        <>
            <GoogleAnalytics trackPageViews gaMeasurementId={gaMeasurementIdMinisite}    />
            <GoogleAnalytics gaMeasurementId={gaMeasurementId} trackPageViews />
            <ThemeProvider theme={theme} >
                <Head>
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <GlobalStyle />

                <Layout>
                    <DefaultSeo
                        canonical={seoData?.openGraph?.url}
                        {...seoData}
                        additionalMetaTags={[{
                            name: 'keywords',
                            content: seoData?.openGraph?.keywords,
                        },
                        {
                            name: 'twitter:image',
                            content: seoData?.openGraph?.images[0].url
                        },
                        {
                            name: 'twitter:title',
                            content: seoData?.openGraph?.title,
                        },
                        {
                            name: 'twitter:description',
                            content: seoData?.openGraph?.description,
                        },
                        {
                            httpEquiv: 'x-ua-compatible',
                            content: 'IE=edge; chrome=1'
                        }]}
                    />
                    {isMounted && <Component {...pageProps} bioData={bioData} seoData={seoData} />}
                </Layout>
            </ThemeProvider>
        </>

    )
}
export default MyApp
