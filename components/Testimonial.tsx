"use client";

import Image from "next/image";

type Testimonial = {
  name: string;
  image: string;
  review: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    image: "/testimonial.jpg",
    review:
      "The customization feature is incredible! I created unique designs for my entire team.",
    rating: 5,
  },
  {
    name: "Mike Chen",
    image: "/testimonial.jpg",
    review:
      "Quality is outstanding and the prices are unbeatable. My go-to store for apparel.",
    rating: 4,
  },
  {
    name: "Emma Davis",
    image: "/testimonial.jpg",
    review:
      "Fast shipping, amazing customer service, and the custom logo feature is a game changer!",
    rating: 1,
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-gray-50 py-20 px-6 ">
      <div className="max-w-7xl mx-auto text-center pb-20 pt-20">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-left">
          What Our Customers Say
        </h2>
        <p className="mt-3 text-gray-600 text-left">
          Join thousands of satisfied customers who love our products.
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={50}
                  height={50}
                  className="rounded-full p-0"
                />

                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">{t.name}</h4>

                  <div className="text-yellow-400">
                    {"★".repeat(t.rating)}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-gray-600 text-left">
                {t.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}