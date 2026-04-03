"use client";

import { ChangeEvent, useRef } from "react";
import { Image as FabricImage, Textbox } from "fabric";
import { getCanvas } from "@/lib/canvas-store";

export default function Toolbar() {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileRef.current?.click();
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const imgUrl = reader.result as string;

      FabricImage.fromURL(imgUrl).then((img) => {
        const cw = canvas.getWidth();
        const ch = canvas.getHeight();

        img.set({
          originX: "center",
          originY: "center",
          left: cw / 2,
          top: ch / 2,
        });

        const maxWidth = cw * 0.5;
        if (img.width! > maxWidth) {
          img.scaleToWidth(maxWidth);
        }

        // 🔥 ONLY THIS ADDED (important)
        (img as any).printifyData = {
          x: img.left / cw,
          y: img.top / ch,
          scaleX: img.scaleX,
          scaleY: img.scaleY,
          angle: img.angle,
        };

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    };

    reader.readAsDataURL(file);
  };

  // ✅ Add Text
  const addText = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    const cw = canvas.getWidth();
    const ch = canvas.getHeight();

    const text = new Textbox("Edit me", {
      left: cw / 2,
      top: ch / 2,
      originX: "center",
      originY: "center",
      fontSize: 24,
      fill: "#000",
    });

    // 🔥 ONLY THIS ADDED
    (text as any).printifyData = {
      x: text.left / cw,
      y: text.top / ch,
      scaleX: text.scaleX,
      scaleY: text.scaleY,
      angle: text.angle,
    };

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  // ✅ Download
  const downloadImage = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "design.png";
    link.click();
  };

  return (
    <div className="flex gap-6 mb-6 items-center justify-center p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleUpload}
        className="hidden"
      />

      <button 
        onClick={handleUploadClick} 
        className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        📤 Upload Image
      </button>

      <button 
        onClick={addText} 
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        ✏️ Add Text
      </button>

      <button 
        onClick={downloadImage} 
        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        💾 Download
      </button>
    </div>
  );
}