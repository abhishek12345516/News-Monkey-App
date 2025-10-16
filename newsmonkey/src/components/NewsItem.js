import React from 'react';

function NewsItem(props) {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className="my-3">
      <div className="card h-100"> {/* h-100 makes the card take full height of container */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0',
          zIndex: '1', // ensures badge is above image
          margin: '10px'
        }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={imageUrl ? imageUrl : "https://media.istockphoto.com/id/1337144146/photo/breaking-news-world-news-global-news-background-with-world-map-and-digital-technology.jpg?s=612x612&w=0&k=20&c=Z0wGZ7O8qXo6n1k1mY3KfM2z5c1gH5H4b8v3XW8EqpU="}
          className="card-img-top"
          alt="news"
          style={{ height: '200px', objectFit: 'cover' }} // fixes image size
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title.length > 60 ? title.slice(0, 60) + "..." : title}</h5>
          <p className="card-text flex-grow-1">
            {description.length > 100 ? description.slice(0, 100) + "..." : description}
          </p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark mt-auto">Read More</a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
