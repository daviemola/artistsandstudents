import InfiniteScroll from "react-infinite-scroll-component";
import React, { useState, useEffect } from "react";
import ArtItem from "./ArtItem";

export default function ScrollItems({ post }) {
  const [posts, setPosts] = useState(post);
  const [hasMore, setHasMore] = useState(true);
  const [counter, setCounter] = useState(2);

  async function getFirstPost() {
    const res = await fetch(`api/artist/1`);
    const arts = await res.json();
    // console.log(arts);
    setPosts(arts.queryset);
  }

  useEffect(() => {
    getFirstPost();
  }, []);

  const getMorePost = async () => {
    setCounter((count) => count + 1);
    const res = await fetch(`api/artist/${counter}`);
    const newPosts = await res.json();
    console.log(newPosts);
    setPosts((post) => [...post, ...newPosts.queryset]);
  };

  return (
    <InfiniteScroll
      dataLength={posts !== undefined ? posts?.length : ""}
      next={getMorePost}
      hasMore={hasMore}
      style={{ overflowY: "hidden" }}
    >
      {posts?.map((art, index) => (
        <div key={index} data-aos="fade-up">
          <ArtItem art={art} />
        </div>
      ))}
    </InfiniteScroll>
  );
}
