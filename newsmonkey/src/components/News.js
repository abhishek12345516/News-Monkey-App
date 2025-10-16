import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  const [articles, setArticles] = useState([]); // always start with empty array
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // capitalize category name for title
  const capitalizeFirstLetter = (string) =>
    string ? string.charAt(0).toUpperCase() + string.slice(1) : "";

  // main fetch function
  const updateNews = async () => {
    try {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8834f076fb2146599fe974bde3543034&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(40);

      let parsedData = await data.json();
      props.setProgress(70);

      if (parsedData?.articles) {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults || 0);
      } else {
        console.warn("⚠️ No articles found or invalid response:", parsedData);
        setArticles([]);
        setTotalResults(0);
      }

      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("❌ Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite Scroll Function
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8834f076fb2146599fe974bde3543034&page=${nextPage}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      const newArticles = parsedData.articles || [];
      setArticles((prevArticles) => prevArticles.concat(newArticles));
      setTotalResults(parsedData.totalResults || totalResults);
      setPage(nextPage);
    } catch (error) {
      console.error("❌ Error fetching more news:", error);
    }
  };

  return (
    <div className="container my-3">
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "70px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles?.length || 0}
        next={fetchMoreData}
        hasMore={articles?.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles
            ?.filter(Boolean)
            .map((element, index) => (
              <div className="col-md-4 my-3" key={element?.url || index}>
                <NewsItem
                  title={element?.title || "No Title Available"}
                  description={element?.description || "No Description"}
                  imageUrl={element?.urlToImage}
                  newsUrl={element?.url}
                  author={element?.author || "Unknown"}
                  date={element?.publishedAt}
                  source={element?.source?.name || "Unknown"}
                />
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

// Default Props
News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

// Prop Types Validation
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;
