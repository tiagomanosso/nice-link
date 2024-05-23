import { DefaultSeo } from 'next-seo';
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";
import Layout from "../components/Layout";
import SEO from '../next-seo.config';
import GlobalStyle from "../styles/GlobalStyle";
import { darkTheme, lightTheme, blueTheme, purpleDarkTheme } from "../styles/theme.config";
import { bioService } from '../components/bio-service';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
    const darkMode = useDarkMode(false, { storageKey: null, onChange: null })
    const [isMounted, setIsMounted] = useState(false)
    const [bioData, setBioData] = useState(true);
    // const theme = lightTheme
    const router = useRouter();
    // console.log("router", router.asPath)
    // const [bioData] = useState();
    //console.log("bioData", bioData)
    useEffect(() => {
        setIsMounted(true);
        const fetchData = async () => {
            try {
                const res = await bioService.getBio(`${router.asPath}`);//'acidblotter/642');
                // WebLinks.setBioData(res); // set bioData to WebLinks.res;
                setBioData(res);
            } catch (error) {
                // Handle the error here
                setBioData([]);
            }
        };

        fetchData();
    }, [])

    let theme = darkMode.value ? darkTheme : lightTheme;

    // DEFAULT("rgb(4 41 64 )"),//#042940
    // COLOR_1("rgb(32 110 160 / 50%)"),
    // COLOR_2("rgb(60 91 135 / 90%)"),
    // COLOR_3("rgb(49 32 160 / 80%)"),
    // COLOR_4("rgb(156 135 246 / 70%)"),

    switch (bioData?.color) {
        case 'rgb(7 68 155 / 95%)':
            theme = blueTheme;
            break;
        case 'rgb(4 41 64 )':
            theme = blueTheme;
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
            <GoogleAnalytics />
            <ThemeProvider theme={theme}>
                <Head>
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <link rel="icon" href="/favicon.png" />

                </Head>
                <GlobalStyle />

                <Layout>
                    <DefaultSeo
                        canonical={SEO.openGraph.url}
                        {...SEO}
                        additionalMetaTags={[{
                            name: 'keywords',
                            content: SEO.openGraph.keywords,
                        },
                        {
                            name: 'twitter:image',
                            content: SEO.openGraph.images[0].url
                        },
                        {
                            name: 'twitter:title',
                            content: SEO.openGraph.title,
                        },
                        {
                            name: 'twitter:description',
                            content: SEO.openGraph.description,
                        },
                        {
                            httpEquiv: 'x-ua-compatible',
                            content: 'IE=edge; chrome=1'
                        }]}
                    />
                    {isMounted && <Component {...pageProps} />}
                </Layout>
            </ThemeProvider>
        </>

    )
}
export default MyApp