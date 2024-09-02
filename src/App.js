import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ServicesComponent from "./components/ServicesComponent";
import HomeComponent from "./components/HomeComponent";
import AboutUsComponent from "./components/AboutUsComponent";
import PostDetail from "./components/PostDetail";
import ServiceOne from "./components/ServiceOne";
import ServiceTwo from "./components/ServiceTwo";
import PortfolioComponent from "./components/PortfolioComponent";
import ContactUsComponent from "./components/ContactUsComponent";
import CarriersComponent from "./components/CarriersComponent";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="flex-1 main pt-5 pb-5">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/services" element={<ServicesComponent />} />
            <Route path="/service-one" element={<ServiceOne />} />
            <Route path="/service-two" element={<ServiceTwo />} />
            <Route path="/about-us" element={<AboutUsComponent />} />
            <Route path="/marketplace" element={<PortfolioComponent />} />
            <Route path="/carriers" element={<CarriersComponent />} />
            <Route path="/contact" element={<ContactUsComponent />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
