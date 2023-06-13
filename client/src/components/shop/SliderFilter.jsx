import ShopItem from "./ShopItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import shirt from "../../img/shop/t-shirt.png";
import weight from "../../img/shop/weight.png";
import pants from "../../img/shop/jogger-pants.png";
// import left from "../../img/shop/left-arrow.png";
// import right from "../../img/shop/right-arrow.png";
import protein from "../../img/shop/proteins.png";
import sneaker from "../../img/shop/sneakers.png";
import gloves from "../../img/shop/gloves.png";
import bra from "../../img/shop/sport-bra.png";

const list = [
  {
    id: 1,
    title: "shirt",
    image: shirt,
  },
  {
    id: 2,
    title: "weight",
    image: weight,
  },
  {
    id: 3,
    title: "pants",
    image: pants,
  },
  {
    id: 4,
    title: "protein",
    image: protein,
  },
  {
    id: 5,
    title: "sneakers",
    image: sneaker,
  },
  {
    id: 5,
    title: "gloves",
    image: gloves,
  },
  {
    id: 6,
    title: "bra",
    image: bra,
  },
];

const SliderFilter = ({ sortBy }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive} autoPlay={true} infinite={true}>
      {list.map((item) => (
        // %PUBLIC_URL% shortcut for public
        <ShopItem
          key={item.id}
          title={item.title}
          image={item.image}
          sortBy={sortBy}
        />
      ))}
    </Carousel>
  );
};

export default SliderFilter;
