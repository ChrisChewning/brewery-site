import React, { useEffect } from "react";

const TwitterIframe = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);

  return (
    <section className="twitterContainer">
      <div className="twitter-embed">
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter"
          href="https://twitter.com/cl_chewning"
        >
          Tweets by Brews
        </a>
      </div>
    </section>
  );
};

export default TwitterIframe;
