import React from 'react';
import { Link } from 'react-router-dom';
import posts from './community-content';

const Community = () => {

    return (
      <>
      <h1>Community Page</h1>
        {posts.map((post, key) => (
            <>
                <p key={key}>Post by {post.poster} on 'date from db adddate'</p>
                <p>{post.content}</p>
                
                  <Link
                    className="brewery-list-item"
                    key={key}
                    to={`/community/${post.name}`}
                    >
                    <h3>{post.name}</h3>
                  </Link>

                </>
            ))}
            </>

)
}

export default Community;
