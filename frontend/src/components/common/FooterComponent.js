import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #FEE5E1;
  color: black;
  padding: 20px 0;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>&copy; SAMSUNG SW ACADEMY FOR YOUTH</p>
    </FooterWrapper>
  );
};

export default Footer;