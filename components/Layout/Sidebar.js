import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebarr() {
  const [posts, setPosts] = useState();
  const [showSidebar, setShowSidebar] = useState(false);

  async function getAllPosts() {
    const res = await fetch(`api/artist/allarts`);
    let newPosts = await res.json();
    const hashMap = {};
    let newArr = newPosts.filter((item, _) => {
      console.log(item.art.epoche);
      let alreadyExists = hashMap.hasOwnProperty(item.art.epoche);
      return alreadyExists ? false : (hashMap[item.art.epoche] = 1);
    });
    setPosts(newArr);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {showSidebar ? (
        <button
          className="flex hover:bg-slate-500 transition-all text-white md:p-4 p-2 text-4xl bg-zinc-900 items-center cursor-pointer fixed md:right-10 right-5 top-5 md:top-6 z-50 rounded backdrop-filter backdrop-blur-lg bg-opacity-75 "
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <FaTimes className="md:text-4xl text-2xl" />
        </button>
      ) : (
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:p-4 p-2 hover:bg-slate-500 transition-all bg-zinc-800 text-white fixed z-30 flex items-center cursor-pointer md:right-10 right-5 top-5 md:top-6 rounded backdrop-filter backdrop-blur-lg bg-opacity-75 "
        >
          <FaBars className="md:text-4xl text-2xl" />
        </button>
      )}
      <div
        className={`lg:w-[21vw] md:w-[25vw] w-2/3 z-20 fixed bg-zinc-800 min-h-screen top-0 left-0 ease-in-out duration-300 backdrop-filter backdrop-blur-lg bg-opacity-75  ${
          showSidebar ? "translate-x-0" : "-translate-x-[100vw]"
        }`}
      >
        <h1 className="text-white my-6 text-center uppercase">Speisekarte</h1>
        <div className="h-[92vh] overflow-y-auto">
          <div className="px-8 pt-4 overflow-y-auto">
            {posts?.map((post, index) => {
              return (
                <div key={index}>
                  <Disclosure>
                    {({}) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-0 py-1 text-left text-white">
                          <span className="text-white">{post.art?.epoche}</span>
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-1 pb-2 text-md text-gray-200">
                          <div className="cursor-pointer">
                            <ul className="ml-4">
                              {post.art?.artist_ids
                                .slice(0, -1)
                                .split(";")
                                .map((art, index) => {
                                  return (
                                    <div key={index}>
                                      <Disclosure>
                                        {({}) => (
                                          <>
                                            <Disclosure.Button className="flex justify-between w-full px-0 py-1 text-left text-white">
                                              {<li>{art}</li>}
                                            </Disclosure.Button>
                                            {post.artist_id === art && (
                                              <Disclosure.Panel className="px-1 pb-2 text-md text-gray-200">
                                                <Link href={`#${post.id}`}>
                                                  <a className="px-4">
                                                    {post.name}
                                                  </a>
                                                </Link>
                                              </Disclosure.Panel>
                                            )}
                                          </>
                                        )}
                                      </Disclosure>
                                    </div>
                                  );
                                })}
                            </ul>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              );
            })}
          </div>
          <div className="px-6 pt-8">
            <hr className="border-gray-700" />
          </div>
          <div className="px-6 pt-4 pb-8">
            <ul>
              <li className="relative text-gray-100 hover:text-white focus-within:text-white">
                <div className="inline-block w-full text-sm rounded">
                  Developed by Schulreform.com
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
