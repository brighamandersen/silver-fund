import React, { useState } from "react";
import sfLogo from "../../media/sf-logo-white.png";
import MsgBanner from "../shared/MsgBanner";
import HomeChangePassword from "./HomeChangePassword";
import { Content, LeftCol } from "../shared/SharedStyles";

export const Home = (props) => {
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);
  const [msg, setMsg] = useState(null);

  return (
    <>
      <MsgBanner success={isSuccessMsg} msg={msg} setMsg={setMsg} />
      <Content>
        <LeftCol>
          <h3>{props.username}, Welcome to the Silver Fund Web App!</h3>
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
          <HomeChangePassword
            username={props.username}
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
