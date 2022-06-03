import { React, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiTitle,
  EuiListGroup,
  EuiAvatar,
  EuiText,
  EuiButton,
  EuiIcon,
  EuiPanel,
} from "@elastic/eui";

import Cookies from "js-cookie";

import SideNav from './SideNav.js';

const LoginPopup = (props) => {
  const history = useHistory();

  const logout = () => {
    Cookies.remove("user");
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <EuiText>
          <span style={{ fontWeight: 600, fontSize: 24 }}>{Cookies.get("user")}</span>
        </EuiText>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <EuiButton size="m" fill onClick={() => logout()}>
          <span style={{ fontWeight: 500, fontSize: 18 }}> logout </span>
        </EuiButton>
      </div>
    </div>
  );
};

function Header() {
  const history = useHistory();

  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [navToggle, setNavToggle] = useState(false);

  const togglePopup = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  const moveToHome = () => {
    history.push("/");
  };

  const moveToLogin = () => {
    history.push("/login");
  };

  const logout = () => {
    Cookies.remove("user");
    history.push("/");
    window.location.reload();
  };
  let user = Cookies.get("user") || "";

  return (
    <>
      <EuiHeader
        theme="dark"
        style={{
          height: "70px",
        }}
        sections={[
          {
            items: [
              <EuiHeaderSectionItem>
                <EuiHeaderSectionItemButton onClick={() => setNavToggle(!navToggle)}>
                  <EuiIcon type="list" color="ghost" size="xl" style={{ "margin-left": "10px" }} />
                </EuiHeaderSectionItemButton>
              </EuiHeaderSectionItem>,
            ],
            borders: "none",
          },
          {
            items: [
              <EuiHeaderSectionItem>
                <EuiHeaderLogo iconType={"logoElasticStack"} onClick={() => moveToHome()}>
                  <span style={{ fontWeight: 500, fontSize: 24 }}> Onsite NFT </span>
                </EuiHeaderLogo>
              </EuiHeaderSectionItem>,
              // <EuiHeaderLinks aria-label="App navigation dark theme example">
              //   <EuiHeaderLink isActive>Docs</EuiHeaderLink>
              //   <EuiHeaderLink>Code</EuiHeaderLink>
              //   <EuiHeaderLink iconType="help"> Help</EuiHeaderLink>
              // </EuiHeaderLinks>,
            ],
            borders: "none",
          },
          {
            items: [
              <EuiHeaderSectionItem>
                {user === "" ? (
                  <>
                    <EuiButton size="m" minWidth="72px" fill onClick={() => moveToLogin()}>
                      <span style={{ fontWeight: 500, fontSize: 16 }}> login </span>
                    </EuiButton>
                  </>
                ) : (
                  <>
                    <EuiHeaderSectionItem>
                      <EuiHeaderSectionItemButton aria-label="Account menu" onClick={() => togglePopup()}>
                        <EuiAvatar name={user} size="l" />
                      </EuiHeaderSectionItemButton>
                      {popupIsOpen && <LoginPopup handleClose={() => togglePopup()} />}
                    </EuiHeaderSectionItem>
                    {/* <EuiHeaderSectionItemButton aria-label="Account menu">
                    <EuiAvatar name={Cookies.get("user")} size="l" />
                  </EuiHeaderSectionItemButton>

                  </EuiButton> */}
                  </>
                )}
              </EuiHeaderSectionItem>,
            ],
            borders: "none",
          },
        ]}
      />
      <SideNav navToggle={navToggle}/>
    </>
  );
}

export default Header;
