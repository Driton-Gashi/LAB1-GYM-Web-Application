const ShopItem = ({ title, image, sortBy }) => {
  return (
    <div className="sliderItem">
      <div
        onClick={() => {
          sortBy(title);
        }}
        className="image-wrapper"
      >
        <img src={image} alt="" />
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default ShopItem;
