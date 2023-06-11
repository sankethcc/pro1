import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import NavigationBar2 from "../NagivationBar2";


export default function Home() {
  return (
    <div className="home">
      <NavigationBar2 />

      <Carousel
         showStatus={false} autoPlay={true} infiniteLoop={true}  interval={2000} showThumbs={false}
      >
        <div >
        <img src={slide1} alt="Bluetooth Speaker"></img>
        <p>
            Bluetooth Speaker
        </p>
      </div>
      <div >
        <img src={slide2} alt="Mobile Phones"></img>
        <p>
            Mobile Phones
        </p>
      </div>


      </Carousel>
    </div>
  );
}
