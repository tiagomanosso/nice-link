import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import seoData from '../next-seo.config';
import WebLinks from '../components/WebLinks';
import { bioService } from "../components/bio-service";

export default function Home() {
  const [bioData, setBioData] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bioService.getBio(`${router.asPath}`);
        setBioData(res);
        setLoading(false);

        await setSeo(res);
      } catch (error) {
        setBioData([]);
      }
    };

    fetchData();
  }, [])
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

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

  async function setSeo(res) {
    seoData.openGraph.title = res?.name;
    seoData.openGraph.url = (res?.shortMiniSiteUrl ? res?.shortMiniSiteUrl : res?.miniSiteUrl) || 'https://landing.parceirando.com.br';
    seoData.openGraph.description = res?.bio;

    if (res?.specialities) {
      const specialLinksString = res?.specialities.map(el => el.value).join(', ');
      seoData.openGraph.keywords = specialLinksString + ', Parceirando';
    }

    if (res?.profileImageUrl) {
      seoData.openGraph.images[0].url = res?.profileImageUrl;
    }
    seoData.site_name = `MiniSite - ${res?.name} - ${res?.username}`;
    if (res?.twitterUrl) {
      seoData.twitter.site = res?.twitterUrl;
    } else {
      seoData.twitter = {};
    }
  }
}

