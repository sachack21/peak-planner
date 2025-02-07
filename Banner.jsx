import React from "react";
import Carousel from "react-bootstrap/Carousel";
import sliderImg1 from "../../assets/images/1.jpg";
import sliderImg2 from "../../assets/images/2.jpg";
import sliderImg3 from "../../assets/images/3.jpg";
import sliderImg4 from "../../assets/images/4.jpg";
import sliderImg5 from "../../assets/images/5.jpg";
import "../Banner/banner.css"; 

function CarouselFadeExample() {
  return (
    <section className="slider">
      <Carousel fade>
        <Carousel.Item >
          <div className="image-container">
            <img src={sliderImg1} className="d-block w-100" alt="First slide" />
          </div>
          <Carousel.Caption>
            <div className="slider_des">
              <h5 className="heading">
                Easy Planning, Unforgettable Experiences!
              </h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <div className="image-container">
            <img
              src={sliderImg2}
              className="d-block w-100"
              alt="Second slide"
            />
          </div>
          <Carousel.Caption>
            <div className="slider_des">
              <h5 className="heading">
                Easy Planning, Unforgettable Experiences!
              </h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <div className="image-container">
            <img
              src={sliderImg3}
              className="d-block w-100"
              alt="Third slide"
            />
          </div>
          <Carousel.Caption>
            <div className="slider_des">
              <h5 className="heading">
                Easy Planning, Unforgettable Experiences!
              </h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <div className="image-container">
            <img
              src={sliderImg4}
              className="d-block w-100"
              alt="Third slide"
            />
          </div>
          <Carousel.Caption>
            <div className="slider_des">
              <h5 className="heading">
                Easy Planning, Unforgettable Experiences!
              </h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <div className="image-container">
            <img
              src={sliderImg5}
              className="d-block w-100"
              alt="Third slide"
            />
          </div>
          <Carousel.Caption>
            <div className="slider_des">
              <h5 className="heading">
                Easy Planning, Unforgettable Experiences!
              </h5>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default CarouselFadeExample;
