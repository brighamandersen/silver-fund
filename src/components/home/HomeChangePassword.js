import React, { useState } from "react";
import passwordIcon from "../../media/lock.png";
import { COLORS } from "../../utils/constants";

export const HomeChangePassword = (props) => {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwdConfirm, setNewPwdConfirm] = useState("");
  const [canChangePwd, setCanChangePwd] = useState(true);

  const changePassword = () => {
    props.setErrorMsg(null);

    if (newPwd === oldPwd) {
      props.setErrorMsg("New password cannot be the same as old password.");
      setNewPwd("");
      setNewPwdConfirm("");
      return;
    }

    if (newPwd.length < 8) {
      props.setErrorMsg("New password must be at least 8 characters long.");
      setNewPwd("");
      setNewPwdConfirm("");
      return;
    }

    if (newPwd !== newPwdConfirm) {
      props.setErrorMsg(
        "You did not re-enter the new password correctly.  Try again."
      );
      setNewPwd("");
      setNewPwdConfirm("");
      return;
    }

    // axios
    //   .put("api/change-password/", {
    //     user: props.username,
    //     old_password: oldPwd,
    //     new_password: newPwd,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     props.setSuccessMsg(
    //       "Success!  Make sure to sign in with your new password in the future."
    //     );
    //     setCanChangePwd(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     props.setErrorMsg(
    //       "Uh oh! Failed to changed password.  Refresh and try again.  If this error persists, contact support."
    //     );
    //   });

    setOldPwd("");
    setNewPwd("");
    setNewPwdConfirm("");
  };

  return (
    <div
      className="mt-5"
      style={{
        maxWidth: "450px",
      }}
    >
      <h5>Change Your Password</h5>
      {canChangePwd ? (
        <>
          <p style={{ color: COLORS.black }}>
            Make sure to secure your account by changing your password from the
            default one you first received.
          </p>
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
              placeholder="Enter old password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
            />
          </div>
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
            className="btn"
            style={{ width: "100%" }}
            onClick={() => changePassword()}
            disabled={(!oldPwd, !newPwd)}
          >
            Change Password
          </button>
        </>
      ) : (
        <p style={{ color: COLORS.black }}>
          You must sign out and sign back in with your new password before you
          can change it again.
        </p>
      )}
    </div>
  );
};

export default HomeChangePassword;
