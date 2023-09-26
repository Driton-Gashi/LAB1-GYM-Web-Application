
import { useState, useEffect } from "react";
import swal from "sweetalert";
import UserProfile from "./UserProfile"
const Publisher = ({getUser}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [review, setReview] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/getcategories");
      const jsonData = await response.json();

      setCategories(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      if (name.length === 0) {
        swal({
          title: "Error",
          text: "Product Name is empty",
          icon: "error",
          timer: 3000,
          button: false,
        });
      } else {
        swal({
          title: "Error",
          text: "Product Name is to short",
          icon: "error",
          timer: 3000,
          button: false,
        });
      }
      return;
    } else if (description.length < 12) {
      if (description.length == 0) {
        swal({
          title: "Error",
          text: "Product description is empty",
          icon: "error",
          timer: 3000,
          button: false,
        });
      } else {
        swal({
          title: "Error",
          text: "Product description is to short",
          icon: "error",
          timer: 3000,
          button: false,
        });
      }
      return;
    } else if (imageUrl.length == 0) {
      swal({
        title: "Error",
        text: "Product imageUrl is empty",
        icon: "error",
        timer: 3000,
        button: false,
      });

      return;
    }
    // else if (
    //   !(
    //     imageUrl.endsWith(".jpg") ||
    //     imageUrl.endsWith(".png") ||
    //     imageUrl.endsWith(".webp") ||
    //     imageUrl.endsWith(".jpeg") ||
    //     imageUrl.endsWith(".gif")
    //   )
    // ) {
    //   swal({
    //     title: "Error",
    //     text: "Your url is not an image",
    //     icon: "error",
    //     timer: 3000,
    //     button: false,
    //   });

    //   return;
    // }
     else if (itemCategory.length == 0) {
      swal({
        title: "Error",
        text: "Please choose an category",
        icon: "error",
        timer: 3000,
        button: false,
      });

      return;
    } else {
      try {
        const response = await fetch(`http://localhost:5000/createitem/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName: name,
            productDescription: description,
            productPrice: price,
            productReview: review,
            productImage: imageUrl,
            productCategory: itemCategory,
            publisherId: getUser().user_id
          }),
        });

        if (response.ok) {
          swal({
            title: "Success",
            text: "You successfully published a new product",
            icon: "success",
            timer: 3000,
            button: false,
          });
        } else {
          swal({
            title: "Error",
            text: "Failed to publish the new product",
            icon: "error",
            timer: 3000,
            button: false,
          });
        }
      } catch (error) {
        swal({
          title: "Error",
          text: "An error occurred while publishing your product",
          icon: "error",
          timer: 3000,
          button: false,
        });
        console.log(error);
      }
    }
  };
  const [items, setItems] = useState([]);
  const [popup, setPopup] = useState({
    isOpen: false,
  });

  const getStars = (review) => {
    let reviewStars = [];

    for (let i = 0; i < review; i++) {
      reviewStars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    for (let i = reviewStars.length; i < 5; i++) {
      reviewStars.push(<i key={i} className="fa-regular fa-star"></i>);
    }
    return reviewStars;
  };

  useEffect(() => {
    // Define the URL for your API endpoint
    let url = 'http://localhost:5000/itemsby/'+getUser().user_id;
    // Fetch data from the API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItems(data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  const deleteItem = async (itemId) => {
    swal({
      title: "Are you sure?",
      text: "You are about to delete this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {
       
        try {
          const response = await fetch(`http://localhost:5000/deleteitem/${itemId}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            swal({
              title: "Success",
              text: "Item was deleted successfully",
              icon: "success",
              timer: 3000,
              button: false,
            });
            window.location.reload(true);
          } else {
            swal({
              title: "Error",
              text: "Failed to delete item",
              icon: "error",
              timer: 3000,
              button: false,
            });
            
          }
        } catch (error) {
          console.error('Error deleting item:', error);
          alert('An error occurred while deleting the item.');
        }
      }
    });
    
  };
  
  
  return (
    <section className="home-section">
       {!popup.isOpen ? (
        ""
      ) : (
        <div className="itemPopup">
          <i
            onClick={() => {
              setPopup({ isOpen: false });
            }}
            className="fa-solid fa-xmark popupClose"
          ></i>
          <div className="InnerItemPopup">
            
          <i
            onClick={()=>deleteItem(popup.itemId)}
            className="fa-solid fa-trash popupDelete"
          ></i>
            <div className="itemPopup_left">
              <img src={popup.image} alt="" />
            </div>
            <div className="itemPopup_right">
              <h1>{popup.title}</h1>
              <h5>
                <span>category: </span>
                {popup.category}
              </h5>
              <div className="review">{getStars(popup.review)}</div>
              <h4>{popup.price}€</h4>
              <p>{popup.description}.</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    <nav>
      <div className="sidebar-button">
        <i className="bx bx-menu sidebarBtn"></i>
        <span className="dashboard-title">Publishe New Item</span>
      </div>
      {/* <div className="search-box">
        <input type="text" placeholder="Search..." />
        <i className="fa-solid fa-magnifying-glass bx-search"></i>
      </div> */}
      <UserProfile getUser={getUser}/>
    </nav>
    <div className="home-content">
      <div className="overview-boxes">
        <div className="box">
          <div className="right-side">
            <div className="box-topic">My Orders</div>
            <div className="number">0</div>
            <div className="indicator">
              <i className="bx bx-up-arrow-alt"></i>
              <span className="text">From {312312312}</span>
            </div>
          </div>
          <i className="bx bx-cart-alt cart"></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Sales</div>
            <div className="number">38,876</div>
            <div className="indicator">
              <i className="bx bx-up-arrow-alt"></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className="bx bxs-cart-add cart two"></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Profit</div>
            <div className="number">$12,876</div>
            <div className="indicator">
              <i className="bx bx-up-arrow-alt"></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className="bx bx-cart cart three"></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Return</div>
            <div className="number">11,086</div>
            <div className="indicator">
              <i className="bx bx-down-arrow-alt down"></i>
              <span className="text">Down From Today</span>
            </div>
          </div>
          <i className="bx bxs-cart-download cart four"></i>
        </div>
      </div>
      <div className="sales-boxes">
        <div className="recent-sales box">
          <div className="title"><i className="fa-solid fa-user"></i> Publisher</div>
          <div className="publisher-form-wrapper">
          <form onSubmit={submitHandler}>
            <div className="form_row_wrapper">
            <div className="form_row">
            <h2>Product name</h2>
            <input
              type="text"
              className="username"
              placeholder="ball"
              value={name}
              onChange={(e) => {
                setName(e.target.value.toLowerCase());
              }}
            />
          </div>
          <div className="form_row">
            <h2>Description</h2>
            <input
              type="text"
              className="email"
              value={description}
              placeholder="This ball is perfectly rounded -_-"
              onChange={(e) => {
                setDescription(e.target.value.toLowerCase());
              }}
            />
          </div>
            </div>
        
          <div className="form_row_wrapper">
          <div className="form_row">
            <h2>Price in €</h2>
            <input
              type="number"
              className="address"
              placeholder="Address"
              min={0}
              max={200}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value.toLowerCase());
              }}
            />
          </div>
          <div className="form_row">
            <h2>Review stars</h2>
            <input
              type="number"
              max={5}
              min={0}
              className="tel"
              value={review}
              onChange={(e) => {
                setReview(e.target.value.toLowerCase());
              }}
            />
          </div>
          </div>
          <div className="form_row_wrapper">
          <div className="form_row">
            <h2>Image Url</h2>
            <input
              type="text"
              className="tel"
              value={imageUrl}
              placeholder="Enter image URL here"
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
          </div>
          <div className="form_row">
            <h2>Category</h2>
            <select
              onChange={(e) => {
                setItemCategory(e.target.value.toLowerCase());
              }}
              className="city"
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option
                  key={category.category_id}
                  value={category.category_name}
                >
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          </div>
          
          <div className="form_row profile_footer">
            <button className="publisher-submit">Publish</button>
          </div>
        </form>
          </div>
        </div>
        <div className="top-sales box">
          <div className="title">Items Published by You</div>
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
              itemId:item.item_id,
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
      </div>
    </div>
  </section>
  )
}

export default Publisher