import { ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <header className="navbar">
      <div className="nav-container">

        <h1 className="nav-logo">EMORYA</h1>

        <nav className="nav-menu">
          <a href="#">Shop</a>
          <a href="#">Customize</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

        {/* ICONS */}
        <div className="nav-icons">
          <User className="" />

          <div className="relative">
            <ShoppingCart  />
            <span className="cart-badge">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;