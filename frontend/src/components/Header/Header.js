import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";

const Header = () => {
  const user = {
    name: "John Doe",
  };

  const {cart} = useCart();

  const logout = () => {};

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Urban Eats
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/profile">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <a onClick={logout}>Logout</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <li>
                <Link to="/cart">
                    Cart
                    {cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span>}
                </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
