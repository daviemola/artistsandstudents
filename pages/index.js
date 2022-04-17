// import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import Head from "next/head";
import ArtItem from "@/components/Home/ArtItem";
import AOS from "aos";
import { useRouter } from "next/router";
import "aos/dist/aos.css";
import ScrollItems from "@/components/Home/ScrollItems";
import Sidebar from "@/components/Layout/Sidebar";

export default function Home({}) {
  const [posts, setPosts] = useState();
  const [allPosts, setAllPosts] = useState();
  const router = useRouter();
  let path = router.asPath.toString();

  async function getAllPosts() {
    const res = await fetch(`api/artist/allarts`);
    const newPosts = await res.json();

    // console.log(newPosts.map((n) => console.log(parseInt(n.art.from))));
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
    <div className="mx-auto">
      <Head>
        <title>Schulaustellung</title>
        <meta name="Schulaustellung" />
      </Head>
      <Sidebar />
      <div className="my-4">
        <h1 className="md:text-4xl text-2xl font-bold text-center my-6 text-zinc-900">
          Schulaustellung
        </h1>
        {path.includes("#") && (
          <>
            {allPosts?.map((art, index) => {
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
    </div>
  );
}
