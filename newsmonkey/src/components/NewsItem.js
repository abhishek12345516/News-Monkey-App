import React from "react";

const NewsItem = ({ title, description, urlToImage, newsUrl, date, author, source }) => {
  return (
    <div className="card h-100 shadow-sm"> {/* 👈 h-100 ensures equal height */}
      <img
        src={urlToImage}
        className="card-img-top"
        alt={title}
        style={{ objectFit: "cover", height: "200px" }} // 👈 same image height
      />
      <div className="card-body d-flex flex-column">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'80%', zIndix:1}}> {source}</span>
        <h5 className="card-title">{title} </h5>
        <p className="card-text flex-grow-1">{description}</p>
        <p className="card-text"><small className="text-muted">By {author } on {new Date(date).toGMTString()}</small></p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-dark mt-auto"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
