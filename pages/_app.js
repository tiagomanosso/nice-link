import { DefaultSeo } from 'next-seo';
import Head from "next/head";
import { useRouter } from "next/router";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";
import Layout from "../components/Layout";
import { bioService } from '../components/bio-service';
import GlobalStyle from "../styles/GlobalStyle";
import { blueTheme, darkTheme, lightBlueTheme, lightTheme, purpleDarkTheme } from "../styles/theme.config";

function MyApp({ Component, pageProps }) {
    const darkMode = useDarkMode(false, { storageKey: null, onChange: null })
    const [isMounted, setIsMounted] = useState(false)
    const [bioData, setBioData] = useState();
    const [seoData, setSeo] = useState();
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        setIsMounted(true);
        const fetchData = async () => {
            try {
                const res = await bioService.getBio(`${router.asPath}`);
                setBioData(res);
                setSeo(createSeoData(res));
                setLoading(false);
            } catch (error) {
                setBioData({});
            }
        };
        fetchData();
    }, [])


    let theme = darkMode.value ? darkTheme : lightTheme;

    if (isLoading) {
        return <></>;
        // return (
        //     <>
        //         <GoogleAnalytics />
        //         <ThemeProvider theme={theme} >
        //             <Head>
        //                 <meta content="width=device-width, initial-scale=1" name="viewport" />
        //                 <link rel="icon" href="/favicon.png" />
        //             </Head>
        //             <GlobalStyle />

        //             <Layout>
        //                 <div className="loading-container">
        //                     <div className="loading-spinner"></div>
        //                     <p>Carregando...</p>
        //                 </div>
        //             </Layout>
        //         </ThemeProvider>
        //     </>
        // );
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
            <GoogleAnalytics />
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

async function createSeoData(res) {

    let seoData = {
        openGraph: {
            images: [
                {
                    url: res?.profileImageUrl
                }
            ],
            title: res?.name,
            url: (res?.shortMiniSiteUrl ? res?.shortMiniSiteUrl : res?.miniSiteUrl) || `https://l.payhero.cloud/${res?.username}/${res?.siteId}`,
            description: res?.bio,
        },
        site_name: `MiniSite - ${res?.name} - ${res?.username}`,
        twitter: {}
    };

    if (res?.specialities) {
        const specialLinksString = res?.specialities.map(el => el.value).join(', ');
        seoData.openGraph.keywords = specialLinksString + ', Parceirando';
    }

    if (res?.twitterUrl) {
        seoData.twitter.site = res?.twitterUrl;
    }
    return seoData;
}