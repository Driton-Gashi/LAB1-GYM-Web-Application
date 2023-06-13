const Item = ({ name, description, price, review, image, setPopup }) => {
  // Review stars logic
  let reviewStars = [];
  for (let i = 0; i < review; i++) {
    //4
    reviewStars.push(<i key={i} className="fa-solid fa-star"></i>);
  }
  for (let i = reviewStars.length; i < 5; i++) {
    reviewStars.push(<i key={i} className="fa-regular fa-star"></i>);
  }

  const addToCart = () => {};

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
          onClick={() => {
            setPopup({
              isOpen: true,
              image: image,
              title: name,
              description: description,
              price: price,
            });
          }}
          src={image}
          width="100%"
          alt=""
        />
      </div>
      <div className="item_bottom">
        <h1>
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
