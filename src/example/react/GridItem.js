import { EuiFlexGroup, EuiFlexItem, EuiText, EuiButton, EuiPanel, EuiCard } from "@elastic/eui";
import API from "../../API";
import Cookies from "js-cookie";

const Content = (props) => {
  // function get_url_extension(url) {
  //   return url.split(/[#?]/)[0].split(".").pop().trim();
  // }
  // let ext = get_url_extension(props.src);
  // let ext = props.src;

  // let img_ext = ["jpg", "png", "jpeg", "gif", "avif"];
  // let vid_ext = ["mp4", "mkv", "avi", "flv"];

  // let imgsrc = "https://upload.wikimedia.org/wikipedia/en/7/70/Campbell%27s_Tomato_Juice_Box._1964._Synthetic_polymer_paint_and_silkscreen_ink_on_wood.jpg";
  // let vidsrc = "http://tcpschool.com/lectures/sample_video_mp4.mp4";

  return <img src={props.src} style={{ width: "360px", height: "auto" }}></img>;

  // if (img_ext.includes(ext)) {
  //   return <img src={imgsrc} style={{ width: "360px", height: "auto" }}></img>;
  // } 
  // else if (vid_ext.includes(ext)) {
  //   return (
  //     <video controls style={{ width: "360px", height: "auto" }}>
  //       <source src={vidsrc}></source>
  //     </video>
  //   );
  // } 
  // else {
  //   return (
  //     <img
  //       src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
  //       style={{ width: "360px", height: "180px" }}
  //     ></img>
  //   );
  // }
};

const GridItem = (props) => {

  const handleBuy = (event) => {
    API.post(
      `/buy/${props.product.id}`,
      {
        user: Cookies.get('user'),
        account: localStorage.getItem("metamaskAccount")
      }
    )
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let owner = props.product.owner;

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
          {props.hideBuy === true ? <></> :
            <EuiFlexItem> 
              <EuiFlexGroup direction="row" justifyContent="spaceBetween" style={{'padding':'0px 16px 16px 16px'}}>
                <span style={{ fontWeight: 600, "align-self": "center" }}>
                    {owner !== '' ? 'Not available' : 'Available'}
                  </span>
                <EuiButton size="m" fill={!owner} onClick={handleBuy}>
                  <span style={{ fontWeight: 500, fontSize: 16 }}> Buy </span>
                </EuiButton>
              </EuiFlexGroup>
            </EuiFlexItem>
          }
        </EuiFlexGroup>
      </EuiPanel>
    </EuiFlexItem>
  );
};

export default GridItem;
