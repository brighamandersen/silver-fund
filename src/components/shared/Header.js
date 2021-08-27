import React from "react";
import byuLogoText from "../../media/byu-logo-text.png";

const Header = (props) => {
  const logOut = () => {
    props.setToken(null);
    localStorage.removeItem("token");
    props.setUsername("");
    localStorage.setItem("username", "");
    props.setPassword("");
  };

  return (
    <div
      className="d-flex w-100 p-2 pt-3 mx-auto flex-column"
      style={{ maxWidth: "60em" }}
    >
      <header>
        <h3 className="float-left">
          <img
            src={byuLogoText}
            alt=""
            style={{
              height: "29px",
              paddingBottom: "6px",
              paddingRight: "8px",
            }}
            id="byu-text"
          />
          Silver Fund
        </h3>
        <nav className="nav float-right">
          {props.token && (
            <button
              type="button"
              className="btn white-btn signout-btn py-1"
              onClick={logOut}
            >
              Log Out
            </button>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
