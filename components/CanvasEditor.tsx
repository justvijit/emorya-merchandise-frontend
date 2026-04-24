"use client";

import { useEffect, useRef } from "react";
import { Canvas, FabricImage } from "fabric";
import { useCanvasStore } from "@/lib/canvas-store";

type Props = {
  product: any; // ✅ NEW
};

export default function CanvasEditor({ product }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRefInstance = useRef<Canvas | null>(null);
  const bgImageRef = useRef<FabricImage | null>(null);
  const { setCanvas } = useCanvasStore();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;

    const canvas = new Canvas(canvasRef.current, {
      width: container.clientWidth,
      height: container.clientWidth * (5 / 4),
    });

    canvasRefInstance.current = canvas;
    setCanvas(canvas);

    const updateData = (e: any) => {
      const obj = e.target;
      if (!obj) return;

      const cw = canvas.getWidth();
      const ch = canvas.getHeight();

      (obj as any).printifyData = {
        x: obj.left / cw,
        y: obj.top / ch,
        scaleX: obj.scaleX,
        scaleY: obj.scaleY,
        angle: obj.angle,
      };
    };

    canvas.on("object:moving", updateData);
    canvas.on("object:scaling", updateData);
    canvas.on("object:rotating", updateData);

    // ✅ 🔥 FIX: DYNAMIC IMAGE LOAD
    FabricImage.fromURL(product?.image || "/tshirt.png").then((img) => {
      bgImageRef.current = img;
      updateCanvas();
    });

    const updateCanvas = () => {
      if (!canvasRefInstance.current || !containerRef.current) return;

      const canvas = canvasRefInstance.current;
      const width = containerRef.current.clientWidth;
      const height = width * (5 / 4);

      canvas.setDimensions({ width, height });

      if (bgImageRef.current) {
        const img = bgImageRef.current;

        const scale = Math.min(
          width / (img.width ?? 1),
          height / (img.height ?? 1)
        );

        img.scale(scale);

        img.set({
          originX: "center",
          originY: "center",
          left: width / 2,
          top: height / 2,
          selectable: false,
          evented: false,
        });

        canvas.backgroundImage = img;
      }

      canvas.getObjects().forEach((obj) => {
        const data = (obj as any).printifyData;
        if (!data) return;

        obj.set({
          left: width * data.x,
          top: height * data.y,
          scaleX: data.scaleX,
          scaleY: data.scaleY,
          angle: data.angle,
        });

        obj.setCoords();
      });

      canvas.renderAll();
    };

    let timeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateCanvas, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
    };
  }, [setCanvas, product]); // ✅ IMPORTANT

  return (
    <div className="flex justify-center bg-white p-4">
      <div
        ref={containerRef}
        className="w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}