import { useState, useEffect } from "react";
import "../css/shop.css";
import Item from "../components/Item";
const Shop = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  // below function still in progress
  const itemsSort = async (e) => {
    if (e.target.value === "reviews") {
      try {
        const response = await fetch("http://localhost:5000/items");
        const jsonData = await response.json();
        setItems(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  console.log(items);
  return (
    <div className="shop">
      <div className="main_banner_shop">
        <div className="main_banner_shop_content">
          <h1>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
          <button>Buy Now</button>
        </div>
      </div>
      <div className="filter_bar">
        <div className="filter_bar_left">
          <button className="filter_button">Accessories</button>
          <button className="filter_button">Pants</button>
          <button className="filter_button">Shirts</button>
          <button className="filter_button">Supplements</button>
          <button className="filter_button">GYM tools</button>
        </div>
        <div className="filter_bar_right">
          <select onChange={itemsSort} id="filter">
            <option value="">Sort by</option>
            <option value="">Price</option>
            <option value="reviews">Reviews</option>
            <option value="">Likes</option>
          </select>
        </div>
      </div>
      <div className="shop_item_wrapper">
        <h1>
          <span>GYM Accessories</span> for you!
        </h1>
        <div className="shop_items">
          {items.map((element) => (
            <Item
              key={element.item_id}
              name={element.item_name}
              description={element.item_description}
              price={element.item_price}
              review={element.item_review}
              image={element.item_image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
