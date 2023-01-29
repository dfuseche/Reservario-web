import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SliderData } from "../Data/SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "./carousel.css";

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {SliderData.map((element, i) => {
        return (
          <div className={i === current ? "slide active" : "slide"} key={i}>
            {i === current && (
              <>
                <h1 className="titulo">{element.titulo}</h1>
                <Link to={"/" + element.ruta}>
                  <img src={element.image} alt="" className="image" />
                </Link>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
