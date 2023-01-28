import React from "react";
import LoginSass from "./Login.module.sass";

const Login = () => {
  return (
    <div className={LoginSass.login}>
    <div className={LoginSass.container}>
      <h1>LOGIN</h1>
      <form>
        <label for="email">Email:</label>
        <input id="email" type="email" className={LoginSass.email}></input>
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          className={LoginSass.password}
        ></input>
        <button type='submit'>LOGIN</button>
        <a clasName={LoginSass.forgot}>Forgot password?</a>
        <p>--or--</p>
        <button className={LoginSass.loginGoogle}>Login with Google</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
