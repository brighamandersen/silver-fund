import React, { useState } from "react";
import sfLogo from "../../media/sf-logo-white.png";
import MsgBanner from "../shared/MsgBanner";
import PasswordChanger from "./PasswordChanger";
import { Content, LeftCol } from "../shared/SharedStyles";
import { useAuth } from "../../utils/AuthContext";

export const Home = (props) => {
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);
  const [msg, setMsg] = useState(null);

  const { username } = useAuth();

  return (
    <>
      <MsgBanner success={isSuccessMsg} msg={msg} setMsg={setMsg} />
      <Content>
        <LeftCol>
          <h3>{username}, Welcome to the Silver Fund Web App!</h3>
          <a
            className="btn m-4"
            href="https://byu.sharepoint.com/sites/silverfund-wiki"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a
            className="btn black-btn m-4"
            href="mailto:silverfund@byu.edu?subject=Question about Web App" // FIXME - Add valid email address
          >
            Contact Us
          </a>
          <PasswordChanger
            setSuccessMsg={(value) => {
              setIsSuccessMsg(true);
              setMsg(value);
            }}
            setErrorMsg={(value) => {
              setIsSuccessMsg(false);
              setMsg(value);
            }}
          />
        </LeftCol>
        <img
          src={sfLogo}
          className="home-logo"
          style={{ height: "500px", marginLeft: "80px", marginTop: "40px" }}
          alt=""
        />
      </Content>
    </>
  );
};

export default Home;
