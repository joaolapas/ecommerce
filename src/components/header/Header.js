import React from "react";
import HeaderSass from "./Header.module.sass";
import logoImg from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const cart = (
  <li className={HeaderSass.link}>
    <Link className={HeaderSass.cartLink} to="/cart">
      <FaShoppingCart />
      <span className={HeaderSass.cartCount}>0</span>
    </Link>
  </li>
);

const logo = (
  <Link to="/">
    <img className={HeaderSass.logo} src={logoImg} alt="logo"></img>
  </Link>
);
const Header = () => {
  const [logged, setLogged] = React.useState(false);
  const [admin, setAdmin] = React.useState(true);
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
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
              <li>Hi, user!</li>
            ) : (
              <li className={HeaderSass.link}>
                <Link className={HeaderSass.Link} to="/login">
                  Login
                </Link>
              </li>
            )}
            {logged ? (
              <li className={HeaderSass.link}>
                <a onClick={() => setLogged(false)}>Log out</a>
              </li>
            ) : (
              <li className={HeaderSass.link}>
                <Link className={HeaderSass.Link} to="/register">
                  Signin
                </Link>
              </li>
            )}
          </ul>
          {cart}
          {showMenu ? <IoClose className={HeaderSass.hamburger} onClick={toggleMenu} /> : <HiMenu className={HeaderSass.hamburger} onClick={toggleMenu} />}
        </nav>
      </div>
      <div className={showMenu ? HeaderSass.showMenu : HeaderSass.menu}>
        <ul className={HeaderSass.menuList}>
          {admin ? <li className={HeaderSass.menuItemAdmin}>Home</li> : null}
          <li className={HeaderSass.menuItem}>Home</li>
          <li className={HeaderSass.menuItem}>Contact Us</li>
          <li className={HeaderSass.menuItem}>Log In</li>
          <li className={HeaderSass.menuItem}>Sign In</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
