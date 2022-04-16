import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import ArtItem from "@/components/Home/ArtItem";
import AOS from "aos";
import { useRouter } from "next/router";
import "aos/dist/aos.css";
import ScrollItems from "@/components/Home/ScrollItems";

export default function Home({}) {
  const [posts, setPosts] = useState();
  const [allPosts, setAllPosts] = useState();

  const router = useRouter();
  let path = router.asPath.toString();

  async function getAllPosts() {
    const res = await fetch(`api/artist/allarts`);
    const newPosts = await res.json();
    console.log(newPosts);
    setAllPosts(newPosts);
    router.push(path);
  }

  useEffect(() => {
    if (path.includes("#")) {
      getAllPosts();
    }
    //eslint-disable-next-line
  }, [path]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout>
      <div className="my-6">
        {path.includes("#") && (
          <>
            {allPosts?.map((art, index) => {
              console.log(art.id);
              return (
                <div key={index} id={art?.id}>
                  <div data-aos="fade-up">
                    <ArtItem art={art} />
                  </div>
                </div>
              );
            })}
          </>
        )}
        {!path.includes("#") && (
          <>
            <ScrollItems post={posts} />
          </>
        )}
      </div>
    </Layout>
  );
}
