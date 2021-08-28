import React, { useState } from "react";
import styled from "styled-components";
import passwordIcon from "../../media/lock.png";
import { useBanner } from "../../utils/BannerContext";
import { COLORS } from "../../utils/constants";

const Wrapper = styled.div`
  margin-top: 3rem;
  max-width: 450px;
`;

const Notice = styled.p`
  color: ${COLORS.black};
`;

const Icon = styled.img`
  width: 50px;
`;

const PasswordChanger = () => {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwdConfirm, setNewPwdConfirm] = useState("");
  const [canChangePwd, setCanChangePwd] = useState(true);

  const { emitSuccessMsg, emitErrorMsg, clearMsg } = useBanner();

  const clearNewPwds = () => {
    setNewPwd("");
    setNewPwdConfirm("");
  };

  const changePassword = () => {
    clearMsg();

    if (newPwd === oldPwd) {
      emitErrorMsg("New password cannot be the same as old password.");
      clearNewPwds();
      return;
    }

    if (newPwd.length < 8) {
      emitErrorMsg("New password must be at least 8 characters long.");
      clearNewPwds();
      return;
    }

    if (newPwd !== newPwdConfirm) {
      emitErrorMsg(
        "You did not re-enter the new password correctly.  Try again."
      );
      clearNewPwds();
      return;
    }

    emitSuccessMsg(
      "Success!  Make sure to sign in with your new password in the future."
    );
    setCanChangePwd(false);

    setOldPwd("");
    setNewPwd("");
    setNewPwdConfirm("");
  };

  return (
    <Wrapper>
      <h5>Change Your Password</h5>
      {canChangePwd ? (
        <>
          <Notice>
            Make sure to secure your account by changing your password from the
            default one you first received.
          </Notice>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <Icon
                className="input-group-text"
                src={passwordIcon}
                alt="Password Icon"
              />
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Enter old password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <Icon
                className="input-group-text"
                src={passwordIcon}
                alt="Password Icon"
              />
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              maxLength="50"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter new password"
              maxLength="50"
              value={newPwdConfirm}
              onChange={(e) => setNewPwdConfirm(e.target.value)}
            />
          </div>
          <button
            className="btn w-100"
            onClick={changePassword}
            disabled={!oldPwd || !newPwd}
          >
            Change Password
          </button>
        </>
      ) : (
        <Notice>
          You must sign out and sign back in with your new password before you
          can change it again.
        </Notice>
      )}
    </Wrapper>
  );
};

export default PasswordChanger;
