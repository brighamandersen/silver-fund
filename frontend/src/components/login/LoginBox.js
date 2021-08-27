import React from "react";
import usernameIcon from "../../media/user.png";
import passwordIcon from "../../media/lock.png";

export const LoginBox = (props) => (
  <div className="card login-box p-4 m-5">
    <h3 className="card-title">Welcome Back!</h3>
    <form>
      {/* Username */}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <img
            className="input-group-text"
            src={usernameIcon}
            alt=""
            style={{ width: "50px" }}
          />
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
        />
      </div>
      {/* Password */}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <img
            className="input-group-text"
            src={passwordIcon}
            alt=""
            style={{ width: "50px" }}
          />
        </div>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
        />
      </div>
      {/* Sign In */}
      <button
        type="button"
        className="btn blue-btn w-100"
        onClick={props.logIn}
      >
        Log In
      </button>
      <h5 className="pt-4">Need an account?</h5>
      <p>Or simply can't log in?</p>
      <a
        className="btn black-btn w-100"
        href="mailto:silverfundsupport@byu.edu" // FIXME - Add valid email address
      >
        Contact Us
      </a>
    </form>
  </div>
);

export default LoginBox;
