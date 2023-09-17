import swal from "sweetalert";
const Item = ({
  id,
  name,
  description,
  price,
  review,
  image,
  category,
  setPopup,
  getUser
}) => {
  
  // Review stars logic
  let reviewStars = [];
  for (let i = 0; i < review; i++) {
    //4
    reviewStars.push(<i key={i} className="fa-solid fa-star"></i>);
  }
  for (let i = reviewStars.length; i < 5; i++) {
    reviewStars.push(<i key={i} className="fa-regular fa-star"></i>);
  }

  const product = {
    product_id: id, // Replace with the actual product ID
    price: price, // Replace with the actual product price
  };

  const addToCart = async () => {
    try {
  
      const response = await fetch(`http://localhost:5000/addtocart/${getUser().user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
  
      if (response.ok) {
        // Product added to cart successfully
        swal({
          title: "Success",
          text: "This product was added to your cart successfully",
          icon: "success",
          timer: 3000,
          button: false,
        });
      } else {
        const errorMessage = await response.json();
        // Failed to add product to cart
        swal({
          title: "Error",
          text: errorMessage,
          icon: "error",
          timer: 3000,
          button: false,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors, e.g., network issues
      swal({
        title: "Error",
        text: "An error occurred while processing your request",
        icon: "error",
        timer: 3000,
        button: false,
      });
    }
  };
  

  return (
    <div className="item">
      <div className="item_top">
        <i
          onClick={(e) => {
            e.target.classList.toggle("fa-regular");
            e.target.classList.toggle("fa-solid");
          }}
          className="fa-regular fa-heart"
        ></i>
        {/* <i class="fa-solid fa-heart"></i> */}
        <img
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPopup({
              isOpen: true,
              itemId: id,
              image: image,
              title: name,
              description: description,
              price: price,
              category: category,
              review: review,
            });
          }}
          src={image}
          width="100%"
          alt=""
        />
      </div>
      <div className="item_bottom">
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPopup({
              isOpen: true,
              itemId: id,
              image: image,
              title: name,
              description: description,
              price: price,
              category: category,
              review: review,
            });
          }}
        >
          {name}
          <span className="price">{price}$</span>
        </h1>
        <p>{description}</p>
        <div className="review">{reviewStars}</div>
        <button onClick={addToCart} className="item_button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
