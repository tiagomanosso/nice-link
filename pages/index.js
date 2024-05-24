import Seo from '../components/Seo';
import WebLinks from '../components/WebLinks';

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