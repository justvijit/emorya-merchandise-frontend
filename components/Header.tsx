"use client";

import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { useEffect } from "react";

export default function Header() {
  const count = useCartStore((s) => s.getCount());
  const loadCart = useCartStore((s) => s.loadCart); // ✅ ADD

  useEffect(() => {
    loadCart(); // ✅ IMPORTANT
  }, []);

  return (
    <header className="navbar">
      <div className="nav-container">

        <h1 className="nav-logo">EMORYA</h1>

        <nav className="nav-menu">
          <a href="/">Shop</a>
          <a href="/customize">Customize</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="nav-icons">
          <User />

          <Link href="/cart" className="relative">
            <ShoppingCart />
            <span className="cart-badge">{count}</span>
          </Link>
        </div>

      </div>
    </header>
  );
}