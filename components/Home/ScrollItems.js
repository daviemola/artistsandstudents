import InfiniteScroll from "react-infinite-scroll-component";
import React, { useState, useEffect } from "react";
import ArtItem from "./ArtItem";
import { API_URL } from "@/config/index";

export default function ScrollItems({ post }) {
  const [posts, setPosts] = useState(post);
  const [hasMore, setHasMore] = useState(true);
  const [counter, setCounter] = useState(2);

  async function getFirstPost() {
    const res = await fetch(`${API_URL}/api/artist/1`);
    const arts = await res.json();
    // console.log(arts);
    setPosts(arts.queryset);
  }

  useEffect(() => {
    getFirstPost();
  }, []);

  const getMorePost = async () => {
    setCounter((count) => count + 1);
    const res = await fetch(`${API_URL}/api/artist/${counter}`);
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
      loader={
        <div className="my-12">
          <p className="font-semibold text-2xl text-center">
            Nothing More to show
          </p>
        </div>
      }
    >
      {posts?.map((art, index) => (
        <div key={index} data-aos="fade-up">
          <ArtItem art={art} />
        </div>
      ))}
    </InfiniteScroll>
  );
}
