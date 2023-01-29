import React from "react";
import RegisterSass from "./Register.module.sass";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  
  const navigate = useNavigate();
  const registerUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoading(false);
          toast.success(`Welcome ${username}`);
          setFirstName("");
          setLastName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false)
        });
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className={RegisterSass.register}>
        <div className={RegisterSass.container}>
          <h1>REGISTER</h1>
          <form onSubmit={registerUser}>
            <div className={RegisterSass.names}>
              <div>
                <input
                  placeholder="First Name"
                  type="text"
                  className={RegisterSass.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div>
                <input
                  placeholder="Last Name"
                  type="text"
                  className={RegisterSass.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
            </div>

            <input
              placeholder="Username"
              type="username"
              className={RegisterSass.username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>

            <input
              placeholder="Email"
              type="email"
              className={RegisterSass.email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>

            <input
              placeholder="Password"
              type="password"
              className={RegisterSass.password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <input
              placeholder="Confirm Password"
              type="password"
              className={RegisterSass.password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></input>
            <button type="submit">REGISTER</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
