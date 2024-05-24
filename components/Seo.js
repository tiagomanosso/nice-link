import { NextSeo } from 'next-seo';

export default function Seo({ page, seoData }) {
    const { title, excerpt, slug, coverImage } = page;
    return (
        <>
            <NextSeo
                title={title}
                titleTemplate={seoData?.openGraph?.title}
                defaultTitle={seoData?.openGraph?.title}
                description={seoData?.openGraph?.description}
                canonical={seoData?.openGraph?.url}
                openGraph={{
                    type: 'website',
                    url: `${seoData?.openGraph?.url}`,
                    title: `${title}`,
                    description: `${seoData?.openGraph?.description}`,
                    locale: 'pt_BR',
                    images: [
                        {
                            width: 1200,
                            height: 630,
                            url: `${seoData?.openGraph?.images.length > 0 ? seoData?.openGraph?.images[0].url : ''}`,
                            alt: `${title}`,
                        },
                    ],
                    site_name: `${seoData?.site_name}`,
                }}
                // twitter={{
                //     handle: '@realvjy',
                //     site: 'vjy.me',
                //     cardType: 'summary_large_image',
                // }}
                additionalMetaTags={[{
                    name: 'keywords',
                    content: `${seoData?.openGraph?.keywords}`
                },
                {
                    name: 'twitter:image',
                    content: `${seoData?.openGraph?.images.length > 0 ? seoData?.openGraph?.images[0].url : ''}`
                },
                {
                    httpEquiv: 'x-ua-compatible',
                    content: 'IE=edge; chrome=1'
                }]}
                robotsProps={{
                    nosnippet: false,
                    notranslate: true,
                    noimageindex: false,
                    noarchive: false,
                    notranslate: false,
                    maxSnippet: -1,
                    maxImagePreview: 'large',
                    maxVideoPreview: -1,
                }}
            />
        </>
    );
}