import React from "react";
import home from '../assets/home.svg';
import { useNavigate } from "react-router-dom";

export const Home = () => {
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img src={Carrusel1} />
                    <Carousel.Caption>
                        <p>Hola</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Carrusel2} />
                    <Carousel.Caption>
                        <p>Hola otra vez</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Carrusel3} />
                    <Carousel.Caption>
                        <p>Hola por última vez</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Home;