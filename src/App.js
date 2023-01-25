import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Contact } from './pages/index';
import { Header, Footer } from './components/index';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
