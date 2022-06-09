import { React, useEffect, useState } from "react";
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
  EuiBadge,
  EuiIcon,
  EuiPanel,
  EuiSpacer
} from "@elastic/eui";

function SubHeader() {
  let [accounts, setAccounts] = useState("");
  let [balance, setBalance] = useState(0);

  useEffect(() => {
    window.onload  = function() {
      if(window.ethereum !=="undefined") {
          this.ethereum.on("accountsChanged", handleAccountsChanged)
          
          window.ethereum.request({method: "eth_accounts"})
              .then(handleAccountsChanged)
              .catch((err)=>{
                  console.log(err)
              })
      }
    }
  }, []);


  const handleAccountsChanged = (a) => {
    console.log("accounts changed")
    setAccounts(a)
    checkBalance(a);
  }

  async function connectWallet() {
    let a = await window.ethereum.request({method: "eth_requestAccounts"})
    .then((res)=>{
      console.log("res : ", res)
      if (a!== accounts){
        setAccounts(a);
      }
    })
    .catch((err)=>{
        // 계정 없으면 오류를 리턴
        console.log(err.code)
    });
    console.log(accounts)
  }

  async function checkBalance(a) {
    let balance = await window.ethereum.request( {method: "eth_getBalance",
        params: [
            a[0],
            'latest'
        ]
  }).catch((err)=>{
    console.log(err)
  })
    console.log(parseInt(balance)/Math.pow(10,18))
    setBalance(parseInt(balance)/Math.pow(10,18))
  }

  /// 프론트나 다른 Transaction에서 params를 받아서 사용해야함
  async function sendTransaction(a) {
  /*
  paramas syntax
        params = [{
        "from": ,
        "to": ,
        "gas": ,
        "gaspPrice":,
        "value":,
        "data":,
    }]
  */
    await window.ethereum.request( {method: "eth_sendTransaction", a})
  }

  const history = useHistory();

  return (
    <>
      <EuiHeader
        theme="light"
        style={{
          padding: "10px",
        }}
        sections={[
          {
            items: [
              <>
                <EuiBadge color="primary">
                  ETH Account
                </EuiBadge>
              </>
            ],
            breadcrumbs: [
              {
                text: accounts,
              },
            ],
            borders: 'none'
          },
          {
            items: [
              <>
                <EuiBadge color="primary">
                  Balance
                </EuiBadge>
              </>
            ],
            breadcrumbs: [
              {
                text: 'Ð ' +balance,
              },
            ],
            borders: 'none'
          },
          {
            items: [
              <>
                <EuiBadge color="success" onClick={connectWallet}>
                  Connect Metamask
                </EuiBadge>
              </>
            ],
            borders: 'none'
          },
        ]}
      />
    </>
  );
}

export default SubHeader;
