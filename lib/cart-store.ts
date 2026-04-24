import { create } from "zustand";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  designImage?: string;
  isCustom?: boolean; // ✅ NEW
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  getCount: () => number;
  getTotal: () => number;
  loadCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  // ✅ LOAD FROM LOCALSTORAGE
  loadCart: () => {
    if (typeof window === "undefined") return;
    const data = localStorage.getItem("cart-ui");
    if (data) set({ cart: JSON.parse(data) });
  },

  // ✅ ADD TO CART (FIXED LOGIC)
  addToCart: (item) => {
    const existing = get().cart.find(
      (i) =>
        i.id === item.id &&
        i.isCustom === item.isCustom &&
        (i.designImage || "") === (item.designImage || "")
    );

    let updated;

    if (existing) {
      updated = get().cart.map((i) =>
        i.id === item.id &&
        i.isCustom === item.isCustom &&
        (i.designImage || "") === (item.designImage || "")
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      updated = [...get().cart, { ...item, quantity: 1 }];
    }

    set({ cart: updated });
    localStorage.setItem("cart-ui", JSON.stringify(updated));
  },

  removeFromCart: (id) => {
    const updated = get().cart.filter((i) => i.id !== id);
    set({ cart: updated });
    localStorage.setItem("cart-ui", JSON.stringify(updated));
  },

  increaseQty: (id) => {
    const updated = get().cart.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    );
    set({ cart: updated });
    localStorage.setItem("cart-ui", JSON.stringify(updated));
  },

  decreaseQty: (id) => {
    const updated = get().cart.map((i) =>
      i.id === id && i.quantity > 1
        ? { ...i, quantity: i.quantity - 1 }
        : i
    );
    set({ cart: updated });
    localStorage.setItem("cart-ui", JSON.stringify(updated));
  },

  getCount: () =>
    get().cart.reduce((sum, i) => sum + i.quantity, 0),

  getTotal: () =>
    get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));