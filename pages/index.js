import WebLinks from '../components/WebLinks';
import Seo from '../components/Seo';
import seoData from '../next-seo.config';
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import { bioService } from "../components/bio-service";

export default function Home() {
  const [bioData, setBioData] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bioService.getBio(`${router.asPath}`);//'acidblotter/642');
        // WebLinks.setBioData(res); // set bioData to WebLinks.res;
        setBioData(res);
        setLoading(false);
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    };

    fetchData();
  }, [])
  // console.log("DATA WEBLINK", WebLinks.bioData)
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // return bioData;
  const page = {
    title: bioData?.title || 'Parceirando',
    excerpt: 'home',
    slug: '/',
    coverImage: 'https://parceirando-minisite-images.s3.amazonaws.com/site/642/642.png'
  };
  // console.log("HOME ---")
  return (
    <>
      <Seo page={page} />
      <WebLinks bioData={bioData} />
    </>
  )
}

