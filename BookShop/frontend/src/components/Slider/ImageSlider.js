import React, { useState } from "react";
import { SliderData } from "./SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import "./ImageSlider.css";

let classNames = require("classnames");

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <section className="sliderr">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={classNames("slide", { active: index === current })}
            // className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt="book" className="image" />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
