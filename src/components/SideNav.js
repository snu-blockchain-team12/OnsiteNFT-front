import { React, useEffect, useState } from "react";

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
  { label: "ALL NFTs", href: "/" },
  { label: "로그인", href: "/login" },
  { label: "나의 NFT", href: "/my" },
  //{ label: "로그인", href: "/login" },
];

export const DeploymentsGroup = (
  <EuiCollapsibleNavGroup
    title={
      <span>
        <strong>Onsite NFT</strong>
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
        <EuiCollapsibleNavGroup title="Menu" isCollapsible={false} initialIsOpen={true}>
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
