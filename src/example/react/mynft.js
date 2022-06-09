import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiButton,
  EuiFieldPassword,
  EuiPanel,
  EuiFlexGrid,
} from "@elastic/eui";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";
import API from "../../API";

import GridItem from "./GridItem";

function MyNFT() {
  var [products, SetProducts] = useState([]);

  useEffect(() => {
    API.get(
      "/products",
      { params: { user: Cookies.get('user') } }
    )
      .then((res) => {
        SetProducts(res.data.products);
      })
      .catch((error) => {
      });
  }, []);

  return (
    <>
      <EuiPanel hasShadow={false} hasBorder={false}>
        <EuiText>
          <span style={{ fontWeight: 600, fontSize: 20 }}>보유중인 NFT 목록입니다.</span>
        </EuiText>
        <br></br>
      </EuiPanel>
      <EuiFlexGroup>
        <EuiFlexItem grow={true}>
          <EuiFlexGrid>
            {products.map((p) => (
              <GridItem product={p} hideBuy={true}/>
              ))}
          </EuiFlexGrid>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}

export default MyNFT;
