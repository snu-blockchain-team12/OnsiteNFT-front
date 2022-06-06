import { EuiFlexGroup, EuiFlexItem, EuiText, EuiButton, EuiPanel, EuiCard } from "@elastic/eui";

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

const handleAccountsChanged = (a) => {
  console.log("accounts changed")
  accounts = a
}

let accounts;
async function connectWallet() {
  accounts = await window.ethereum.request({method: "eth_requestAccounts"})
    .catch((err)=>{
    // 계정 없으면 오류를 리턴
    console.log(err.code)
  })
  console.log(accounts)
  checkBalance()
}

async function checkBalance() {
  let balance = await window.ethereum.request( {method: "eth_getBalance",
      params: [
          accounts[0],
          'latest'
      ]
}).catch((err)=>{
  console.log(err)
})
  console.log(parseInt(balance)/Math.pow(10,18))
}


const Content = (props) => {
  function get_url_extension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }
  let ext = get_url_extension(props.src);

  let img_ext = ["jpg", "png", "jpeg", "gif", "avif"];
  let vid_ext = ["mp4", "mkv", "avi", "flv"];

  let imgsrc = "https://upload.wikimedia.org/wikipedia/commons/a/ab/1000_white_flags_general.jpg";
  let vidsrc = "http://tcpschool.com/lectures/sample_video_mp4.mp4";

  if (img_ext.includes(ext)) {
    return <img src={imgsrc} style={{ width: "360px", height: "auto" }}></img>;
  } 
  else if (vid_ext.includes(ext)) {
    return (
      <video controls style={{ width: "360px", height: "auto" }}>
        <source src={vidsrc}></source>
      </video>
    );
  } 
  else {
    return (
      <img
        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        style={{ width: "360px", height: "180px" }}
      ></img>
    );
  }
};

const GridItem = (props) => {

  let owner = (props.product.price*100)%2;

  return (
    <EuiFlexItem>
      <EuiPanel hasShadow={true} hasBorder={true}>
        <EuiFlexGroup direction="column">
          <EuiFlexItem>
            <EuiFlexGroup direction="row" justifyContent="spaceBetween">
              <EuiFlexItem>
                <span style={{ fontWeight: 600, fontSize: 22 }}>{props.product.title}</span>
              </EuiFlexItem>
              <EuiFlexItem>
                <span style={{ fontWeight: 600, "text-align": "right" }}>
                  Ð {props.product.price}
                </span>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <span>{props.product.content}</span>
          </EuiFlexItem>
          <EuiFlexItem>
            <Content src={props.product.link} />
          </EuiFlexItem>
          <EuiFlexItem> 
            <EuiFlexGroup direction="row" justifyContent="spaceBetween" style={{'padding':'0px 16px 16px 16px'}}>
              <span style={{ fontWeight: 600, "align-self": "center" }}>
                  {owner ? 'Not available' : 'Available'}
                </span>
              <EuiButton size="m" fill={!owner} onClick={connectWallet}>
                <span style={{ fontWeight: 500, fontSize: 16 }}> Buy </span>
              </EuiButton>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </EuiFlexItem>
  );
};

export default GridItem;
