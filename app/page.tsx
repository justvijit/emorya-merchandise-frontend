"use client";

import FashionSection from "@/components/Fashion-Section";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Product";
import TestimonialSection from "@/components/Testimonial";
import { useObjectTracking } from "@/hooks/useObjectTracking";

export default function Home() {
  useObjectTracking();

  return (
    <div className=" pt-20">
      <Header/>
      <Hero/>
      <Products/>
     <TestimonialSection />
     <FashionSection />
     <Footer />

    </div>
  );
}