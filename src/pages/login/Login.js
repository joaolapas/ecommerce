import React from "react";
import LoginSass from "./Login.module.sass";
import { signInWithEmailAndPassword } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Logged!");
        setLoading(false)
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false)
      });
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className={LoginSass.login}>
        <div className={LoginSass.container}>
          <h1>LOGIN</h1>
          <form onSubmit={loginUser}>
            <input
              placeholder="Email"
              type="email"
              className={LoginSass.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <input
              placeholder="Password"
              type="password"
              className={LoginSass.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">LOGIN</button>
            <Link to="/reset" clasName={LoginSass.forgot}>
              Forgot password?
            </Link>
            <p>--or--</p>
            <button className={LoginSass.loginGoogle}>Login with Google</button>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
