"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, getTotal } =
    useCartStore();

    const loadCart = useCartStore((s) => s.loadCart);

useEffect(() => {
  loadCart();
}, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
        <Header/>

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Your cart is empty 🛒
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 items-center bg-white p-4 rounded-2xl shadow-sm border hover:shadow-md transition"
              >
                {/* IMAGE */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={item.designImage || item.image}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">
                    Premium quality product
                  </p>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* PRICE + REMOVE */}
                <div className="text-right">
                  <p className="font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit sticky top-20">

            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}