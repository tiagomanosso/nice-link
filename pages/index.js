import Seo from '../components/Seo';
import WebLinks from '../components/WebLinks';
import { bioService } from '../components/bio-service';
import sDefault from '../next-seo.config';

export default function Home({ bioData, seoData }) {

  const page = {
    title: bioData?.name || 'Parceirando',
    excerpt: 'home',
    slug: '/',
    coverImage: bioData?.profileImageUrl || 'https://parceirando-minisite-images.s3.amazonaws.com/site/642/642.png',
  };
  return (
    <>
      <Seo page={page} seoData={seoData} />
      <WebLinks bioData={bioData} />
    </>
  )
}

export const getServerSideProps = async (_ctx) => {
  try {
    const pa = _ctx.req.url || _ctx.req.headers.referer;
    const bData = await bioService.getBio(`${pa}`);
    if (bData && bData?.name) {
      let sData = {
        openGraph: {
          type: 'website',
          locale: 'pt_BR',
          images: [
            {
              width: 1200,
              height: 630,
              url: bData?.profileImageUrl
            }
          ],
          title: `MiniSite -  ${bData?.name} - ${bData?.username}`,
          url: (bData?.shortMiniSiteUrl ? bData?.shortMiniSiteUrl : bData?.miniSiteUrl) || `https://l.payhero.cloud/${bData?.username}/${bData?.siteId}`,
          description: bData?.bio,
        },
        site_name: `MiniSite - ${bData?.name ? bData?.name : 'Parceirando'} - ${bData?.username ? bData?.username : ''}`,
        twitter: {}
      };

      if (bData?.specialities) {
        const specialLinksString = bData?.specialities.map(el => el.value).join(', ');
        sData.openGraph.keywords = specialLinksString + ', Parceirando';
      }

      if (bData?.twitterUrl) {
        sData.twitter.site = bData?.twitterUrl;
      }
      return { props: { bioData: JSON.parse(JSON.stringify(bData)), seoData: JSON.parse(JSON.stringify(sData)) } };
    }
  } catch (error) {
    console.log("error", error)
  }
  return { props: { bioData: [], seoData: JSON.parse(JSON.stringify(sDefault)) } };

};