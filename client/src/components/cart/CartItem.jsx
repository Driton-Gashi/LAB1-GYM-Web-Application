import React, { useState } from "react";

const CartItem = ({ image, name, price }) => {
  const [count, setCount] = useState(1);

  const decreaseCount = () => {
    if (count !== 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const increaseCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Calculate the item price based on the current count
  const itemPrice = price * count;

  return (
    <div className="item">
      <div className="removeFromCart">
      <i className="fa-solid fa-x"></i>
      </div>
      <div className="img-col">
        <img src={image} alt={name} />
      </div>
      <div className="meta-col">
        <div>
          <h3>{name}</h3>
          <div title="This Feature has not been added yet!" className="count">
            <span title="This Feature has not been added yet!"  onClick={decreaseCount} className="decrease">-</span>
            {count}
            <span title="This Feature has not been added yet!"  onClick={increaseCount} className="increase">+</span>
          </div>
        </div>
        <p className="price">{itemPrice}€</p>
      </div>
    </div>
  );
};

export default CartItem;
