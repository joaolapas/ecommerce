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
  const [logged, setLogged] = React.useState(true);
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
            {logged ? <li className={HeaderSass.navItem}>
              <Link className={HeaderSass.Link} to="/orders">
                Orders
              </Link>
            </li> : null}
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
                <Link to='/' className={HeaderSass.Link} onClick={() => setLogged(false)}>Log out</Link>
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
          {admin ? <Link to='/admin' className={HeaderSass.menuItemAdmin} onClick={toggleMenu}>Admin</Link> : null}
          <Link to='/' className={HeaderSass.menuItem} onClick={toggleMenu}>Home</Link>
          <Link to='/contact' className={HeaderSass.menuItem} onClick={toggleMenu}>Contact Us</Link>
          {logged? <Link to='/orders' className={HeaderSass.menuItem} onClick={toggleMenu}>My Orders</Link> : null}
          <Link to='/login' className={HeaderSass.menuItem} onClick={toggleMenu}>Log In</Link>
          <Link to='/register' className={HeaderSass.menuItem} onClick={toggleMenu}>Sign In</Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
