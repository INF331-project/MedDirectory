import Carousel from "react-bootstrap/Carousel";
import Carrusel1 from "../assets/doctors1.jpg";
import Carrusel2 from "../assets/doctors2.jpg";
import Carrusel3 from "../assets/doctors3.jpg";

export const Home = () => {
    console.log(JSON.stringify(import.meta.env.VITE_API_URL));
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