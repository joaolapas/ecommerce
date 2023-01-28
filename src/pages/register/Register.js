import React from "react";
import RegisterSass from "./Register.module.sass";


const Register = () => {
  return (
    <div className={RegisterSass.register}>
    <div className={RegisterSass.container}>
      <h1>SIGN IN</h1>
      <form>
        <div className={RegisterSass.names}>
          <div>
            <label for="firstName">First Name:</label>
            <input id="firstName" type="text" className={RegisterSass.firstName}></input>
          </div>
          <div>
            <label for="lastName">Last Name:</label>
            <input id="lastName" type="text" className={RegisterSass.lastName}></input>
          </div>
          
        </div>
        
        <label for="username">Username:</label>
        <input id="username" type="username" className={RegisterSass.username}></input>
        <label for="email">Email:</label>
        <input id="email" type="email" className={RegisterSass.email}></input>
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          className={RegisterSass.password}
        ></input>
        <button type='submit'>SIGN IN</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
