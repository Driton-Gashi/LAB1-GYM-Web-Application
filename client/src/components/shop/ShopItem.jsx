import { useState } from "react";

const ShopItem = ({ title, image, category }) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/items?category=${category}`
      );
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  console.log(items);

  return (
    <div onClick={getItems} className="sliderItem">
      <img src={image} alt="" />
      <h4>{title}</h4>
    </div>
  );
};

export default ShopItem;
