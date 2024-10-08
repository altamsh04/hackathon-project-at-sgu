import AboutUs from "./AboutUs";
import Features from "./Features";
import HeroSection from "./HeroSection";
import Testimonials from "./Testomonial";
import Navbar from "./Navbar"
import Footer from './Footer'


const Landing = () => {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <Features />
      <AboutUs />
      <Testimonials/>
      <Footer />
    </>
  );
};

export default Landing;
