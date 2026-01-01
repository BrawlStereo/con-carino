import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import DetailsProduct from "./components/detailsproduct/DetailsProduct.jsx";
import ProductList from "./components/productlist/ProductList.jsx";

function App() {
  return (
    <Router>
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<DetailsProduct />} />
          <Route path="/productos" element={<ProductList />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
