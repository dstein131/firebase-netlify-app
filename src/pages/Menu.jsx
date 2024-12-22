import React from "react";
import "./Menu.css";

// Import images directly for proper bundling
import espressoImage from "../assets/espresso.jpeg";
import cappuccinoImage from "../assets/cappuccino.jpg";
import latteImage from "../assets/latte.jpeg";
import mochaImage from "../assets/mocha.jpg";
import americanoImage from "../assets/americano.jpeg";
import icedCoffeeImage from "../assets/iced-coffee.jpeg";
import teaSelectionImage from "../assets/tea-selection.jpeg";
import pastryImage from "../assets/pastry.jpeg";

const Menu = () => {
  const menuItems = [
    { name: "Espresso", description: "Rich and bold, a classic shot of espresso.", price: "$3.00", image: espressoImage },
    { name: "Cappuccino", description: "Espresso topped with steamed milk and foam.", price: "$4.00", image: cappuccinoImage },
    { name: "Latte", description: "Creamy blend of espresso and steamed milk.", price: "$4.50", image: latteImage },
    { name: "Mocha", description: "Chocolate, espresso, and steamed milk topped with whipped cream.", price: "$5.00", image: mochaImage },
    { name: "Americano", description: "Espresso diluted with hot water for a lighter taste.", price: "$3.50", image: americanoImage },
    { name: "Iced Coffee", description: "Cold-brewed coffee served over ice.", price: "$3.50", image: icedCoffeeImage },
    { name: "Tea Selection", description: "A variety of soothing herbal and black teas.", price: "$2.50", image: teaSelectionImage },
    { name: "Pastry of the Day", description: "Freshly baked daily treats.", price: "$2.00", image: pastryImage },
  ];

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu</h1>
      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="menu-item-overlay">
              <h2 className="menu-item-name">{item.name}</h2>
              <p className="menu-item-description">{item.description}</p>
              <p className="menu-item-price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
