import Seo from '../components/Seo';
import WebLinks from '../components/WebLinks';
import { bioService } from '../components/bio-service';
import { bioData } from '../data/BioData';
import sDefault from '../next-seo.config';

export default function Home({ bioData, seoData }) {

  const page = {
    title: bioData?.title || 'Parceirando',
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
  const pa = _ctx.req.url || _ctx.req.headers.referer;
  const bData = await bioService.getBio(`${pa}`);

  const fantasyName = bData.site?.nomeFantasia ? " - " + bData.site?.nomeFantasia : '';
  const title = `MiniSite -  ${bData?.name} - ${bData?.username}${fantasyName}`;
  if (bData && bData?.name && bData?.enabled) {
    let sData = {
      openGraph: {
        type: 'website',
        locale: 'pt_BR',
        images: [
          {
            width: 1200,
            height: 630,
            url: bData?.profileImageUrl ? bData?.profileImageUrl : `https://parceirando-minisite-images.s3.amazonaws.com/site/642/642.png`,
          }
        ],
        title: `${title}`,
        url: (bData?.shortMiniSiteUrl ? bData?.shortMiniSiteUrl : bData?.miniSiteUrl) || `https://links.parceirando.com.br/${bData?.username}/${bData?.siteId}`,
        description: bData?.bio,
      },
      site_name: `${title}`,
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
  return { props: { bioData: JSON.parse(JSON.stringify(bioData)), seoData: JSON.parse(JSON.stringify(sDefault)) } };
};