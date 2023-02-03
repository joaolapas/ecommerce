import React, { useEffect } from "react";
import HeaderSass from "./Header.module.sass";
import logoImg from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import useStore from "../../Zustand/Store";



const Cart = () => {
  const cart = useStore(state=>state.cart)
  const sum = useStore(state=>state.sum)
  const showCount = useStore(state=>state.showCount)
  return (
  <li className={HeaderSass.link}>
    <Link className={HeaderSass.cartLink} to="/cart">
      <FaShoppingCart />
      <span className={HeaderSass.cartCount}>{sum}</span>
    </Link>
  </li>
  )
}

const logo = (
  <Link to="/">
    <img className={HeaderSass.logo} src={logoImg} alt="logo"></img>
  </Link>
);


const Header = () => {
  const [logged, setLogged] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout!");
        setLogged(false);
        setAdmin(false);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  
  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if (user) {
        setLogged(true);
        if(user.email === 'joaolapasdev@gmail.com'){
          setAdmin(true);
          const uid = user.uid;
          setUserName(user.displayName);
        }
      } else {
        setLogged(false);
      }
    });
  }, [])
   

 

  return (
    <>
      <ToastContainer />
      <header className={HeaderSass.header}>
        <div className={HeaderSass.container}>
          {logo}
          <nav className={HeaderSass.nav}>
            <ul className={HeaderSass.navList}>
              <li className={HeaderSass.navItem}>
                <Link className={HeaderSass.Link} to="/">
                  Home
                </Link>
              </li>
              <li className={HeaderSass.navItem}>
                <Link className={HeaderSass.Link} to="/contact">
                  Contact
                </Link>
              </li>
              {logged ? (
                <li className={HeaderSass.navItem}>
                  <Link className={HeaderSass.Link} to="/orders">
                    Orders
                  </Link>
                </li>
              ) : null}
              {admin ? (
                <li className={HeaderSass.navItemAdmin}>
                  <Link className={HeaderSass.Link} to="/admin">
                    Admin
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
          <nav className={HeaderSass.loginNav}>
            <ul>
              {logged ? (
                <div className={HeaderSass.hiUser}><li>Hi, {userName}!</li></div>
              ) : (
                <li className={HeaderSass.link}>
                  <Link className={HeaderSass.Link} to="/login">
                    Login
                  </Link>
                </li>
              )}
              {logged ? (
                <li className={HeaderSass.link}>
                  <Link
                    to="/"
                    className={HeaderSass.Link}
                    onClick={logoutUser}
                  >
                    Log out
                  </Link>
                </li>
              ) : (
                <li className={HeaderSass.link}>
                  <Link className={HeaderSass.Link} to="/register">
                    Register
                  </Link>
                </li>
              )}<Cart/>
            </ul>
            
            {showMenu ? (
              <>
                <div className={HeaderSass.hamburgercart}><Cart/></div>
                <IoClose className={HeaderSass.hamburger} onClick={toggleMenu} />
              </>
            ) : (
              <>
                <div className={HeaderSass.hamburgercart}><Cart/></div>
                <HiMenu className={HeaderSass.hamburger} onClick={toggleMenu} />
              </>
            )}
          </nav>
        </div>
        <div className={showMenu ? HeaderSass.showMenu : HeaderSass.menu}>
          <ul className={HeaderSass.menuList}>
            {admin ? (
              <Link
                to="/admin"
                className={HeaderSass.menuItemAdmin}
                onClick={toggleMenu}
              >
                Admin
              </Link>
            ) : null}
            <Link to="/" className={HeaderSass.menuItem} onClick={toggleMenu}>
              Home
            </Link>
            <Link
              to="/contact"
              className={HeaderSass.menuItem}
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            {logged ? (
              <Link
                to="/orders"
                className={HeaderSass.menuItem}
                onClick={toggleMenu}
              >
                My Orders
              </Link>
            ) : null}
            <Link
              to="/login"
              className={HeaderSass.menuItem}
              onClick={toggleMenu}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className={HeaderSass.menuItem}
              onClick={toggleMenu}
            >
              Sign In
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
