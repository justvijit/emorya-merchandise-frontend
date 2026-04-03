import { create } from "zustand";
import { Canvas } from "fabric";

type CanvasState = {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas) => void;
};

export const useCanvasStore = create<CanvasState>((set) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),
}));

export const getCanvas = () => useCanvasStore.getState().canvas;