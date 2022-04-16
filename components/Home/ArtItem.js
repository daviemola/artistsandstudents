import React from "react";
import Image from "next/image";

export default function ArtItem(art) {
  return (
    <div className="my-6">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        <div className="bg-zinc-900 md:min-h-screen min-h-[90vh] flex flex-col">
          <div className="flex justify-center my-12">
            <div className="mt-12">
              <div className="rounded overflow-hidden shadow-lg">
                <Image
                  className="w-full"
                  src="/artwork.jpg"
                  alt="art"
                  layout="responsive"
                  width={500}
                  height={320}
                />
              </div>
              <div>
                <p className="text-gray-100 text-xl text-center">
                  Ernerst Ludwig Kirchir (1899 - 1920)
                  <br />
                  Dir Artisitin (1920)
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-12">
            <div>
              <div className="rounded overflow-hidden shadow-lg">
                <Image
                  className="w-full"
                  src="/artwork.jpg"
                  alt="art"
                  layout="responsive"
                  width={400}
                  height={280}
                />
              </div>
              <div>
                <p className="text-gray-100 text-xl text-center">
                  Alexandar Friesberg (1899 - 1920)
                  <br />
                  (7b, JG: 2020/2021)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-zinc-100">
          <div className="flex flex-col gap-12 justify-between min-h-[85vh] my-12 mx-8">
            <div>
              <h2 className="md:text-3xl text-2xl text-gray-700 text-center mb-2">
                {art?.art?.art?.epoche} (
                {`${art?.art?.art?.from} - ${art?.art?.art?.until}`})
              </h2>
              <p className="text-lg">
                {art?.art?.art?.epoche_description.replace("\u00a0", "")}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Merkemele:</h2>
              <p className="text-lg whitespace-normal">
                {art?.art?.art?.epoche_definition.replace(/<br\s*\/?>/gm, "\n")}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Verterer:</h2>
              <ul className="list-disc ml-4 text-lg">
                {art?.art?.art?.artist_ids
                  .slice(0, -1)
                  .split(";")
                  .map((art, index) => (
                    <li key={index}>{art}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-zinc-400">
          <div className="mx-8 my-12">
            <h2 className="md:text-3xl text-2xl text-gray-900 text-center mb-2">
              {art.art.artist_id}
            </h2>
            <p className="text-lg whitespace-normal">
              {art.art.description.replace("\u00a0", "")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
