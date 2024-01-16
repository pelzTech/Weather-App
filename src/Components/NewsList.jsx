import React from 'react';
import './NewsList.css';
// NewsList component
const NewsList = ({ news }) => {
  return (
    <>
    <div className="news-container">
         {news.map((article, index) => (
        <div key={index} className='news'>
          <a className='News' href={article.url} target="_blank" rel="noopener noreferrer">
            <img src={article.urlToImage} alt={article.title}/>
            <p>{article.title}</p>
          </a>
          </div>
      ))}
</div>
</>
  );
};

export default NewsList;
