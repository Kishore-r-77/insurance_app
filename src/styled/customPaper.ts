import styled from "styled-components";

export const CustomPaper = styled.div`
  @font-face {
    font-family: Poppins Medium;
    src: url("../../fonts/Poppins/Poppins-Medium.ttf");
  }

  .paperStyle {
    width: 90%;
    margin: 20px auto;
    overflow-y: scroll;
    max-height: 350px;
    font-family: Poppins Medium;
  }

  /* .table-cell:nth-child(odd) {
  background: rgb(241, 216, 237);
} */

  .flexButtons {
    display: flex;
    gap: 1rem;
  }
  .header {
    background-color: rgba(71, 11, 75, 1);
    color: white;
    position: sticky;
    top: 0;
  }

  .icon {
    max-height: 30px;
    color: white;
  }

  .icon-disabled {
    max-height: 30px;
    color: grey;
  }
`;
