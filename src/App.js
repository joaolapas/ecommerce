import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Contact, Admin, Login, Register, Cart } from './pages/index';
import { Header, Footer } from './components/index';
//import './style.sass'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
