import React, { useState, useEffect, useRef } from 'react';
import NewsList from './NewsList';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const isInitialFetch = useRef(true);

  const Api = "2e6ff7a852bd46bc9887f4e2c1170f6e";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=world&sortBy=popularity&page=${page}`, {
        method: 'GET',
        headers: {
          'x-Api-Key': Api,
        },
      });

      const data = await response.json();

      setTotalResults(data.totalResults);

      if (data.articles && Array.isArray(data.articles)) {
        setNews((prevNews) => [...prevNews, ...data.articles]);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.error('API response does not contain an array of articles:', data);
      }

      // Check if all articles are loaded
      if (data.articles.length === data.totalResults) {
        setEnd(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if (!end && !loading) {
        fetchData();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [end, loading]);

  useEffect(() => {
    if (isInitialFetch.current) {
      fetchData();
      isInitialFetch.current = false;
    }
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <div>
      <NewsList news={news} />
      {loading && !end && <p>Loading more news...</p>}
      {!loading && end && <p>No more articles to load.</p>}
    </div>
  );
};

export default News;
