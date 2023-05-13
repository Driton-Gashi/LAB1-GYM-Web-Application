const CartItem = ({ image, name, price }) => {
  return (
    <div className="item">
      <div className="img-col">
        <img src={image} />
      </div>
      <div className="meta-col">
        <h3>{name}</h3>
        <p className="price">{price}€</p>
      </div>
    </div>
  );
};

export default CartItem;
