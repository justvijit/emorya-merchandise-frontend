"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Product";
import { useObjectTracking } from "@/hooks/useObjectTracking";

export default function Home() {
  useObjectTracking();

  return (
    <div className=" pt-20">
      <Header/>
      <Hero/>
      <Products/>
     
      
    </div>
  );
}