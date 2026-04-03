"use client";

import CanvasEditor from "@/components/CanvasEditor";
import Toolbar from "@/components/Toolbar";
import { useObjectTracking } from "@/hooks/useObjectTracking";

export default function Home() {
  useObjectTracking();

  return (
    <div className="p-10">
      <Toolbar />
      <CanvasEditor />
    </div>
  );
}