// src/pages/Menu.jsx
import React from "react";
import "./Menu.css";

const Menu = () => {
  const menuItems = [
    { name: "Espresso", description: "Rich and bold, a classic shot of espresso.", price: "$3.00" },
    { name: "Cappuccino", description: "Espresso topped with steamed milk and foam.", price: "$4.00" },
    { name: "Latte", description: "Creamy blend of espresso and steamed milk.", price: "$4.50" },
    { name: "Mocha", description: "Chocolate, espresso, and steamed milk topped with whipped cream.", price: "$5.00" },
    { name: "Americano", description: "Espresso diluted with hot water for a lighter taste.", price: "$3.50" },
    { name: "Iced Coffee", description: "Cold-brewed coffee served over ice.", price: "$3.50" },
    { name: "Tea Selection", description: "A variety of soothing herbal and black teas.", price: "$2.50" },
    { name: "Pastry of the Day", description: "Freshly baked daily treats.", price: "$2.00" },
  ];

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu</h1>
      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <h2 className="menu-item-name">{item.name}</h2>
            <p className="menu-item-description">{item.description}</p>
            <p className="menu-item-price">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
