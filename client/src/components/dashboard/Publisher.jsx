import { useState, useEffect } from "react";
import swal from "sweetalert";
const Publisher = () => {
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
    } else if (
      !(
        imageUrl.endsWith(".jpg") ||
        imageUrl.endsWith(".png") ||
        imageUrl.endsWith(".webp") ||
        imageUrl.endsWith(".jpeg") ||
        imageUrl.endsWith(".gif")
      )
    ) {
      swal({
        title: "Error",
        text: "Your url is not an image",
        icon: "error",
        timer: 3000,
        button: false,
      });

      return;
    } else if (itemCategory.length == 0) {
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
  return (
    <div className="publisher">
      <div className="profile_header">
        <h1>Publish a new product</h1>
      </div>

      <div className="profile_body">
        <form onSubmit={submitHandler}>
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
          <div className="form_row profile_footer">
            <button>Publish</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publisher;
