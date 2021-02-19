import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Moment from "react-moment";
import axios from "axios";

const News = () => {
  let [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("/api/news")
      .then((response) => {
        console.log(response.data)
        setNews(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])


console.log(news)

  return (
    <>
      <Card className="news-index-parent">
      <h2>Brews News</h2>
      {news.map((news, i) => (
          <div key={i}>
            <li key={i} className="news-index-li">
            <h2 className="brews-news-title">{news.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: news.content }} className="brews-news-paragraph" />
            <p dangerouslySetInnerHTML={{ __html: news.content_two }} className="brews-news-paragraph-two" />
            <p dangerouslySetInnerHTML={{ __html: news.content_three }} className="brews-news-paragraph-three" />
            <div className="event-date-link">
              <p className="brews-news-date"><Moment format=" M. D. YY"></Moment> * </p>
            <p className="brews-news-link"><a href={news.link}>link</a></p>
            </div>
      </li>
          </div>
  ))
}
      </Card>
      </>
  )


}
export default News;
