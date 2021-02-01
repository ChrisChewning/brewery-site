import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
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
      <Card className="news-index">
      <h2>Brews News</h2>
      {news.map((news, i) => (
          <div key={i}>
            <li key={i}>
            <h3>{news.title}</h3>

            <p dangerouslySetInnerHTML={{ __html: news.content }} />
            </li>
          </div>
  ))
}
      </Card>
      </>
  )


}
export default News;
