import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    searchQuery: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  // ✅ Use your new API key and always HTTPS
  apiKey = "8834f076fb2146599fe974bde3543034";

  async updateNews(pageNo = 1) {
    this.props.setProgress(10);
    try {
      this.setState({ loading: true });

      const { country, category, pageSize, searchQuery } = this.props;

      const url = searchQuery
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${this.apiKey}&page=${pageNo}&pageSize=${pageSize}`
        : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}&page=${pageNo}&pageSize=${pageSize}`;

      const response = await fetch(url);
      this.props.setProgress(30);
      if (!response.ok) {
        console.error("Error fetching news:", response.status, response.statusText);
        this.setState({ loading: false });
        return;
      }

      const parsedData = await response.json();
      console.log("Fetched Data:", parsedData);
      this.props.setProgress(50);

      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: true,
        page: pageNo
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error("Network or JSON error:", error);
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ page: 1 });
      this.updateNews(1);
    }
  }

  fetchMoreData = async () => {
    try {
      const nextPage = this.state.page + 1;
      const { country, category, pageSize, searchQuery } = this.props;

      const url = searchQuery
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${this.apiKey}&page=${nextPage}&pageSize=${pageSize}`
        : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}&page=${nextPage}&pageSize=${pageSize}`;

      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error fetching more news:", response.status, response.statusText);
        return;
      }

      const parsedData = await response.json();
      console.log("Fetched More Data:", parsedData);

      this.setState({
        articles: this.state.articles.concat(parsedData.articles || []),
        totalResults: parsedData.totalResults || 0,
        page: nextPage
      });
    } catch (error) {
      console.error("Fetch more error:", error);
    }
  };

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center mb-4'>
          {this.props.searchQuery
            ? `NewsMonkey - Results for "${this.props.searchQuery}"`
            : `NewsMonkey - Top ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines`}
        </h1>
            {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='row'>
            {!this.state.loading && this.state.articles.length === 0 && (
              <h5 className="text-center mt-3">No news found for this search.</h5>
            )}

            {this.state.articles.map((element, index) => (
              <div className='col-md-4 my-3' key={`${element.url || 'no-url'}-${index}`}>
                <NewsItem
                  title={element.title || "No Title"}
                  description={element.description || "No Description Available"}
                  urlToImage={element.urlToImage || "https://via.placeholder.com/400x200?text=No+Image"}
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
  }
}

export default News;
