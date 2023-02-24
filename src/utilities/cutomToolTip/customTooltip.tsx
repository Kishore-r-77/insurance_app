import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const CustomTooltip = (props: any) => {
  let tooltext = props.text;
  return (
    <OverlayTrigger
      delay={{ hide: 450, show: 300 }}
      overlay={(props) => <Tooltip {...props}>{tooltext}</Tooltip>}
      placement="bottom"
    >
      {props.children}
    </OverlayTrigger>
  );
};

export default CustomTooltip;
