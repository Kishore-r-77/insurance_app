import moment from "moment";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  const StyledFooter = styled.footer`
    @font-face {
      font-family: Poppins Regular;
      src: url("./fonts/Poppins/Poppins-Regular.ttf");
    }
    min-width: 100vw;
    background-color: purple;
    color: white;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0%;
    font-family: Poppins Regular;
    font-weight: bolder;
    font-size: larger;
    padding: 0.5rem;
    background-color: rgba(71, 11, 75, 1);
  `;
  return (
    <>
      <StyledFooter>
        <h4>www.futurainstech.com ©{moment().format("YYYY")}</h4>
      </StyledFooter>
      <Outlet />
    </>
  );
}

export default Footer;
