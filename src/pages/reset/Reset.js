import React from "react";
import ResetSass from "./Reset.module.sass";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className={ResetSass.login}>
        <div className={ResetSass.container}>
          <h1>Reset Password</h1>
          <form onSubmit={resetPassword}>
            <input
              placeholder="Email"
              type="email"
              className={ResetSass.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button type="submit">RESET</button>
            <div className={ResetSass.navigation}>
              <Link to="/login" className={ResetSass.login}>
                login
              </Link>
              <Link to="/register" clasName={ResetSass.register}>
                signin
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reset;
