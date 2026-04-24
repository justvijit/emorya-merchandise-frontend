"use client";

import Image from "next/image";
import { useState } from "react";
import CustomizeModal from "./CustomizeModal";
import { useCartStore } from "@/lib/cart-store";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  customizable?: boolean;
  type: "cart" | "custom";
};

const products: Product[] = [
  {
    id: 1,
    name: "Classic White Tee",
    price: "$29.99",
    image: "/tshirt.png",
    customizable: true,
    type: "custom",
  },
  {
    id: 2,
    name: "Premium Cotton Shirt",
    price: "$49.99",
    image: "/greay.jpg",
    type: "cart",
  },
  {
    id: 3,
    name: "Essential Crew Neck",
    price: "$34.99",
    image: "/blue.jpg",
    customizable: true,
    type: "custom",
  },
  {
    id: 4,
    name: "Basic Tee Collection",
    price: "$79.99",
    image: "/BlackTshit.png",
    type: "cart",
  },
{
    id: 5,
    name: "Basic Tee Collection",
    price: "$79.99",
    image: "/images (2).jpg",
    type: "cart",
  },

  {
    id: 6,
    name: "Basic Tee Collection",
    price: "$79.99",
    image: "/images (1).jpg",
    type: "cart",
  },
  {
    id: 7,
    name: "Basic Tee Collection",
    price: "$79.99",
    image: "/imageswdw.jpg",
    type: "cart",
  },




];

export default function Products() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <section className="products">
      <div className="products-container">
        <h2 className="products-title">Featured Products</h2>
        <p className="products-subtitle">
          Discover our collection of premium apparel.
        </p>

        <div className="products-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">

              <div className="product-image">
                <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                {item.customizable && <span className="badge">Customizable</span>}
              </div>

              <h3 className="product-title">{item.name}</h3>
              <p className="product-price">{item.price}</p>

              <button
                onClick={() => {
                  if (item.type === "custom") {
                    setSelectedProduct(item); // ✅ FIX
                    setOpen(true);
                  } else {
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: Number(item.price.replace("$", "")),
                      image: item.image,
                      isCustom: false,
                    });
                  }
                }}
                className={`product-btn ${
                  item.type === "cart" ? "btn-pink" : "btn-blue"
                }`}
              >
                {item.type === "cart" ? "Add to Cart" : "Customize"}
              </button>

            </div>
          ))}
        </div>

        <CustomizeModal
          open={open}
          onClose={() => setOpen(false)}
          product={selectedProduct} // ✅ FIX
        />
      </div>
    </section>
  );
}