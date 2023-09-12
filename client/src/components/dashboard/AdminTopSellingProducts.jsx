const AdminTopSellingProducts = ({ items,setPopup }) => {
  return (
    <div className="top-sales box">
      <div className="title">Top Seling Product</div>
      <ul className="top-sales-details">
        {items.map((item, index) => (
          <li title={`click to open popup for: ${item.item_name}`} className="adminProduct" onClick={() => {
            setPopup({
              isOpen: true,
              image: item.item_image,
              title: item.item_name,
              description: item.item_description,
              price: item.item_price,
              category: item.item_category,
              review: item.item_review,
            });
          }} key={index}>
            <a href="#">
              <img
                src={`${item.item_image}`}
              />
              <span className="product">{item.item_name}</span>
            </a>
            <span className="price">{item.item_price}€</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTopSellingProducts;
