import React, { useState } from "react";

import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiButton,
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiCode,
} from "@elastic/eui";
import { EuiListGroup } from "@elastic/eui";

export const ReactExampleNav = [
  { label: "로그인", href: "/login" },
  { label: "로그인", href: "/login" },
  { label: "로그인", href: "/login" },
];

export const DeploymentsGroup = (
  <EuiCollapsibleNavGroup
    title={
      <span>
        <small style={{ fontWeight: "normal" }}>메뉴</small> <br />
        <strong>샘플 코드 목록</strong>
      </span>
    }
    background="dark"
  ></EuiCollapsibleNavGroup>
);

const SideNav = (props) => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [oldNavToggle, setOldNavToggle] = useState(false);

  if(oldNavToggle!==props.navToggle){
      setOldNavToggle(props.navToggle);
      setNavIsOpen(!navIsOpen);
  }
  
  return (
    <>
      <EuiCollapsibleNav
        isOpen={navIsOpen}
        size={200}
        // button={<EuiButton onClick={() => setNavIsOpen((isOpen) => !isOpen)}>Toggle nav</EuiButton>}
        onClose={() => setNavIsOpen(false)}
      >
        {DeploymentsGroup}
        <EuiCollapsibleNavGroup title="리액트 기본 예시" isCollapsible={true} initialIsOpen={true}>
          <EuiListGroup
            listItems={ReactExampleNav}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
      </EuiCollapsibleNav>
    </>
  );
};

export default SideNav;
