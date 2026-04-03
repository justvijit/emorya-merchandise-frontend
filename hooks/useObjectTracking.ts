import { useEffect } from "react";
import { getCanvas } from "@/lib/canvas-store";

export const useObjectTracking = () => {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const attachEvents = () => {
      const canvas = getCanvas();

      if (!canvas) return;

      const update = (obj: any) => {
        if (!obj) return;

        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        const width = obj.getScaledWidth();
        const height = obj.getScaledHeight();

        const data = {
          x: obj.left / canvasWidth,
          y: obj.top / canvasHeight,
          width: width / canvasWidth,
          height: height / canvasHeight,
          scale: obj.scaleX,
          angle: obj.angle,
        };

        console.log("🔥 PRINTIFY DATA:", data);
      };

      canvas.on("object:moving", (e) => update(e.target));
      canvas.on("object:scaling", (e) => update(e.target));
      canvas.on("object:rotating", (e) => update(e.target));

      console.log("✅ Tracking Attached");

      clearInterval(interval);
    };

    // 👉 wait until canvas ready
    interval = setInterval(attachEvents, 200);

    return () => clearInterval(interval);
  }, []);
};