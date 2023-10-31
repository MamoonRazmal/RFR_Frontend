import React from "react";
import diamond from "../assets/mainherosection.webp";
import mainbg from "../assets/mainbg.webp";
import bg3 from "../assets/bg3.webp";
// Default theme
import "@splidejs/splide/css";

// or other themes
import "@splidejs/splide/css/skyblue";
import "@splidejs/splide/css/sea-green";

// or only core styles
import "@splidejs/splide/css/core";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { NavLink } from "react-router-dom";

const Slides = () => {
  const splide = new Splide(".splide");

  return (
    <Splide options={{ rewind: true }} aria-label="React Splide Example">
      <SplideSlide>
        <NavLink to={"/product/ALLURE-HOMME"}>
          {" "}
          <img src={diamond} alt="Image 1" />
        </NavLink>
      </SplideSlide>
      <SplideSlide>
        <img src={mainbg} alt="Image 2" />
      </SplideSlide>
      <SplideSlide>
        <img src={bg3} alt="Image 2" />
      </SplideSlide>
    </Splide>

    // <div className="container mt-4">
    //   <h1 className="secondary">Spliedjs</h1>
    //   <div className="splide bg-secondary">
    //     <div className="splide__slider">
    //       <div className="splide__track">
    //         <ul className="splide__list">
    //           <li className="splide__slide">
    //             <img src={diamond} alt="" />
    //             <img src={mainbg} alt="" />
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Slides;
