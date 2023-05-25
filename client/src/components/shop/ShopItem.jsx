const ShopItem = ({ title, image }) => {
  return (
    <div className="sliderItem">
      <div className="image-wrapper">
        <img src={image} alt="" />
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default ShopItem;
