"use client";

import Image from "next/image";

const data = [
  {
    title: "Spring Fashion Trends 2026",
    desc: "Discover the hottest fashion trends for this spring season and how to style them.",
    image:
      "/girl.jpeg",
  },
  {
    title: "The Art of Custom Apparel",
    desc: "Learn how to create stunning custom designs that reflect your unique personality.",
    image:
      "/girl.jpeg",
  },
];

export default function FashionSection() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto pb-20">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Fashion Inspiration
        </h2>
        <p className="mt-2 text-gray-600">
          Get inspired by the latest trends and styling tips.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={700}
                className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-gray-200">
                  {item.desc}
                </p>

                <button className="mt-4 flex items-center gap-2 text-white font-medium">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}