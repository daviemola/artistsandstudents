import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

export default function Sidebar({ children }) {
  const [posts, setPosts] = useState();

  async function getAllPosts() {
    const res = await fetch(`api/artist/allarts`);
    const newPosts = await res.json();
    setPosts(newPosts);
  }

  console.log(posts);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="">
      <div className="w-72 bg-zinc-800 overflow-y-auto min-h-screen">
        <div className="">
          <div className="px-6 pt-4">
            {posts?.map((post, index) => (
              <Link href={`#${post.id}`} key={index}>
                <a>
                  <Disclosure>
                    {({}) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-0 py-1 text-left text-white">
                          <span>{post.art?.epoche}</span>
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-1 pb-2 text-md text-gray-200">
                          <div className="cursor-pointer">
                            <ul className="ml-4">
                              <li>
                                Artist 1
                                <div className="px-3">
                                  <div>Portrait 1</div>
                                  <div>Portrait 2</div>
                                </div>
                              </li>
                              <li>
                                Artist 2
                                <div className="px-3">
                                  <div>Portrait 1</div>
                                  <div>Portrait 2</div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </a>
              </Link>
            ))}
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
      {children}
    </div>
  );
}
