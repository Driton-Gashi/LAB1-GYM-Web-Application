import { useState, useEffect } from "react";
import "../css/shop.css";
import Item from "../components/Item";
import Slider from "../components/shop/sliderFilter";
const Shop = () => {
  const [items, setItems] = useState([]); // yogurt, protein

  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      const jsonData = await response.json();
      setItems(jsonData);
      console.log(Array.isArray(jsonData))
    } catch (err) {
      console.error(err.message);
    }
  };
  // below function still in progress
  const itemsSort = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:5000/items?orderBy=${e.target.value}`
      );
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="shop">
      <div className="main_banner_shop">
        <div className="main_banner_shop_content">
          <h1>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
          <button>Buy Now</button>
        </div>
      </div>
      <Slider />
      <div className="filter_bar_right">
        <select onChange={itemsSort} id="filter">
          <option value="">Sort by</option>
          <option value="item_price">Price</option>
          <option value="item_review">Reviews</option>
          <option value="item_likes">Likes</option>
        </select>
      </div>
      {/* <div className="filter_bar">
        <div className="filter_bar_left">
          <button className="filter_button">Accessories</button>
          <button className="filter_button">Pants</button>
          <button className="filter_button">Shirts</button>
          <button className="filter_button">Supplements</button>
          <button className="filter_button">GYM tools</button>
        </div>
        
      </div> */}
      <div className="shop_item_wrapper">
        <h1>
          <span>GYM Accessories</span> for you!
        </h1>
        <div className="shop_items">
          {items.map((element) => (
            // %PUBLIC_URL% shortcut for public
            <Item
              key={element.item_id}
              name={element.item_name}
              description={element.item_description}
              price={element.item_price}
              review={element.item_review} //4
              image={element.item_image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
