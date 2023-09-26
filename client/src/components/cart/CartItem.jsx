import React, { useState } from "react";
import swal from "sweetalert";
const CartItem = ({getUser, id,image, name, price }) => {
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

  // Remove Item from Cart Function
  const removeItemFromCart = async () => {
    swal({
      title: "Are you sure?",
      text: "You are about to Remove this product from your cart!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {
       
        try {
          const response = await fetch(`http://localhost:5000/removefromcart/${getUser().user_id}/${id}`, {
            method: "DELETE",
          });
    
          if (response.ok) {
            swal({
              title: "Success",
              text: "User was removed from your cart successfully",
              icon: "success",
              timer: 3000,
              button: false,
            });
            window.location.reload(true);
          } else {
            swal({
              title: "Error",
              text: "Failed to remove product from your cart",
              icon: "error",
              timer: 3000,
              button: false,
            });
          }
        } catch (error) {
          swal({
            title: "Error",
            text: "An error occurred while removing this product from your cart",
            icon: "error",
            timer: 3000,
            button: false,
          });
          console.log(error);
        }
      }
    });
  };
  return (
    <div className="item">
      <div onClick={removeItemFromCart} className="removeFromCart">
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
