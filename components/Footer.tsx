"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-700 pt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white pb-4">Emorya</h2>
          <p className="mt-3 text-sm text-white">
           Premium custom apparel for those who dare to be different.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-semibold text-white">Shop</h3>
          <ul className="mt-3 space-y-2 text-md text-white">
            <li><Link href="#">Men's</Link></li>
            <li><Link href="#">Women's</Link></li>
            <li><Link href="#">Custom</Link></li>
            <li><Link href="#">Sale</Link></li>
          </ul>
        </div>
         <div>
          <h3 className="font-semibold text-white">Support</h3>
          <ul className="mt-3 space-y-2 text-md text-white">
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Shipping</Link></li>
            <li><Link href="#">Returns</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Company</h3>
          <ul className="mt-3 space-y-2 text-md text-white">
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Sustainability</Link></li>
            <li><Link href="#">Press</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-white py-10">
        © 2026 Emorya. All rights reserved.
      </div>
    </footer>
  );
}