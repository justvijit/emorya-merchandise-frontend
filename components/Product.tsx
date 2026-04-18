import Image from "next/image";

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
    image: "/tshirt.png",
    type: "cart",
  },
  {
    id: 3,
    name: "Essential Crew Neck",
    price: "$34.99",
    image: "/tshirt.png",
    customizable: true,
    type: "custom",
  },
  {
    id: 4,
    name: "Basic Tee Collection",
    price: "$79.99",
    image: "/tshirt.png",
    type: "cart",
  },
];

export default function Products() {
  return (
    <section className="products">
      <div className="products-container">

        <h2 className="products-title">Featured Products</h2>
        <p className="products-subtitle">
          Discover our collection of premium apparel, ready to customize or wear as is.
        </p>

        <div className="products-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">

              <div className="product-image">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {item.customizable && (
                  <span className="badge">Customizable</span>
                )}
              </div>

              <h3 className="product-title">{item.name}</h3>
              <p className="product-price">{item.price}</p>

              <button
                className={`product-btn ${
                  item.type === "cart" ? "btn-pink" : "btn-blue"
                }`}
              >
                {item.type === "cart" ? "Add to Cart" : "Customize"}
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}