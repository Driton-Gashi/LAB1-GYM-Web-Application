import React from "react";
import left from "../../img/left-arrow.png";
import right from "../../img/right-arrow.png";
import ShopItem from "./ShopItem";
import shirt from "../../img/t-shirt.png";
import weight from "../../img/weight.png";
import protein from "../../img/proteins.png";
import sneaker from "../../img/sneakers.png";
import pants from "../../img/jogger-pants.png";
import gloves from "../../img/gloves.png";
import bra from "../../img/sport-bra.png";
const sliderFilter = () => {
  const scrollLeft = (e) => {
    const left = e.target;
    if (
      left
        .closest(".sliderWrapper")
        .parentNode.querySelector(".slider")
        .classList.contains("slide1")
    ) {
      left
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.remove("slide1");
    } else if (
      left
        .closest(".sliderWrapper")
        .parentNode.querySelector(".slider")
        .classList.contains("slide2")
    ) {
      left
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.add("slide1");
      left
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.remove("slide2");
    } else if (
      left
        .closest(".sliderWrapper")
        .parentNode.querySelector(".slider")
        .classList.contains("slide3")
    ) {
      left
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.add("slide2");
      left
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.remove("slide3");
    }
  };
  const scrollRight = (e) => {
    const right = e.target;

    if (
      right
        .closest(".sliderWrapper")
        .parentNode.querySelector(".slider")
        .classList.contains("slide1")
    ) {
      right
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.add("slide2");
      right
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.remove("slide1");
    } else if (
      right
        .closest(".sliderWrapper")
        .parentNode.querySelector(".slider")
        .classList.contains("slide2")
    ) {
      right
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.remove("slide2");
      right
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.add("slide3");
    } else {
      right
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.remove("slide3");
      right
        .closest(".sliderWrapper")
        .querySelector(".slider")
        .classList.add("slide1");
    }
  };
  return (
    <div className="sliderWrapper">
      <div onClick={scrollLeft} className="leftArrow">
        <img src={left} alt="" />
      </div>
      <div onClick={scrollRight} className="rightArrow">
        <img src={right} alt="" />
      </div>
      <div className="overflowSlider">
        <div className="slider">
          <ShopItem title="T-Shirt" image={shirt} />
          <ShopItem title="Weight" image={weight} />
          <ShopItem title="Sneaker" image={sneaker} />
          <ShopItem title="Protein" image={protein} />
          <ShopItem title="Pants" image={pants} />
          <ShopItem title="Gloves" image={gloves} />
          <ShopItem title="Sport Bra" image={bra} />
          <ShopItem title="T-Shirt" image={shirt} />
          <ShopItem title="Weight" image={weight} />
          <ShopItem title="Protein" image={protein} />
          <ShopItem title="Sneaker" image={sneaker} />
          <ShopItem title="Pants" image={pants} />
          <ShopItem title="Gloves" image={gloves} />
          <ShopItem title="Sport Bra" image={bra} />
        </div>
      </div>
    </div>
  );
};

export default sliderFilter;
