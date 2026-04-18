"use client";

import CanvasEditor from "@/components/CanvasEditor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Product";
import Toolbar from "@/components/Toolbar";
import { useObjectTracking } from "@/hooks/useObjectTracking";

export default function Home() {
  useObjectTracking();

  return (
    <div className=" pt-20">
      <Header/>
      <Hero/>
      <Products/>
      <Toolbar />
      <CanvasEditor />
    </div>
  );
}