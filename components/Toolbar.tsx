"use client";

import { ChangeEvent, useRef } from "react";
import { Image as FabricImage, Textbox } from "fabric";
import { getCanvas } from "@/lib/canvas-store";
import { useCartStore } from "@/lib/cart-store";

type Props = {
  onClose: () => void;
  product: any;
};

export default function Toolbar({ onClose, product }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const addToCart = useCartStore((s) => s.addToCart);

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

        canvas.add(img);
        canvas.renderAll();
      });
    };

    reader.readAsDataURL(file);
  };

  const addText = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    const text = new Textbox("Edit me", {
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: "center",
      originY: "center",
    });

    canvas.add(text);
    canvas.renderAll();
  };

  const downloadImage = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL({ format: "png" });
    link.download = "design.png";
    link.click();
  };

  const handleAddToCart = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    const dataURL = canvas.toDataURL({ format: "png" });

    addToCart({
      id: Date.now(),
      name: product?.name || "Custom T-Shirt",
      price: Number(product?.price?.replace("$", "")) || 49.99,
      image: product?.image || "/tshirt.png",
      designImage: dataURL,
      isCustom: true,
    });

    onClose(); // ✅ modal close
  };

  return (
    <div className="flex gap-6 mb-6 items-center justify-center p-4 bg-white shadow-lg rounded-lg border border-gray-200">

      <input
        type="file"
        ref={fileRef}
        onChange={handleUpload}
        className="hidden"
      />

      <button onClick={handleUploadClick} className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-full">
        Upload
      </button>

      <button onClick={addText} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full">
        Text
      </button>

      <button onClick={downloadImage} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full">
        Download
      </button>

      <button onClick={handleAddToCart} className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full">
        Add to Cart
      </button>

    </div>
  );
}