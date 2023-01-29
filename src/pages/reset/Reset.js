import React from "react";
import ResetSass from "./Reset.module.sass";
import { Link } from "react-router-dom";

const Reset = () => {
  return (
    <div className={ResetSass.login}>
      <div className={ResetSass.container}>
        <h1>Reset Password</h1>
        <form>
          <input
            placeholder="Email"
            type="email"
            className={ResetSass.email}
          ></input>
          <button type="submit">RESET</button>
          <div className={ResetSass.navigation}>
            <Link to="/login" clasName={ResetSass.login}>
              login
            </Link>
            <Link to="/register" clasName={ResetSass.register}>
              signin
            </Link>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Reset;
