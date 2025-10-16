import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country, pageSize, category, searchQuery, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const apiKey = "8834f076fb2146599fe974bde3543034";

  const updateNews = useCallback(
    async (pageNo = 1) => {
      setProgress(10);
      setLoading(true);

      try {
        const url = searchQuery
          ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(
              searchQuery
            )}&apiKey=${apiKey}&page=${pageNo}&pageSize=${pageSize}`
          : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${pageNo}&pageSize=${pageSize}`;

        const response = await fetch(url);
        setProgress(30);

        if (!response.ok) {
          console.error("Error fetching news:", response.status, response.statusText);
          setLoading(false);
          return;
        }

        const parsedData = await response.json();
        setProgress(70);

        setArticles(parsedData.articles || []);
        setTotalResults(parsedData.totalResults || 0);
        setPage(pageNo);
        setLoading(false);
        setProgress(100);
      } catch (error) {
        console.error("Network or JSON error:", error);
        setLoading(false);
      }
    },
    [country, category, pageSize, searchQuery, setProgress]
  );

  useEffect(() => {
    updateNews();
  }, [updateNews]);

  useEffect(() => {
    setPage(1);
    updateNews(1);
  }, [searchQuery, updateNews]);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;

      const url = searchQuery
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            searchQuery
          )}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`
        : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;

      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error fetching more news:", response.status, response.statusText);
        return;
      }

      const parsedData = await response.json();
      setArticles((prevArticles) => prevArticles.concat(parsedData.articles || []));
      setTotalResults(parsedData.totalResults || 0);
      setPage(nextPage);
    } catch (error) {
      console.error("Fetch more error:", error);
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center mb-4">
        {searchQuery
          ? `NewsMonkey - Results for "${searchQuery}"`
          : `NewsMonkey - Top ${
              category.charAt(0).toUpperCase() + category.slice(1)
            } Headlines`}
      </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {!loading && articles.length === 0 && (
            <h5 className="text-center mt-3">No news found for this search.</h5>
          )}

          {articles.map((element, index) => (
            <div className="col-md-4 my-3" key={`${element.url || "no-url"}-${index}`}>
              <NewsItem
                title={element.title || "No Title"}
                description={element.description || "No Description Available"}
                urlToImage={
                  element.urlToImage || "https://via.placeholder.com/400x200?text=No+Image"
                }
                newsUrl={element.url}
                author={element.author || "Unknown"}
                date={element.publishedAt}
                source={element.source?.name || "Unknown"}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

// ✅ Default props & prop types
News.defaultProps = {
  country: "in", // changed from "us" to "in" for India news
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  searchQuery: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
