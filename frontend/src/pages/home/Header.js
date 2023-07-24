import React from "react";
import classes from "./Header.module.scss";
// import styled from "styled-components";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.logo} />
      <div className={classes.navMenu}>
        <div className={classes.navItem}>About us</div>
        <div className={classes.navItem}>Features</div>
        <div className={classes.navItem}>Pricing</div>
        <div className={classes.navItem}>Blog</div>
        <div className={classes.loginNavItem}>
          <div className={classes.navItem}>로그인</div>
        </div>
      </div>
    </div>
  );
};

// const Logo = styled.div`
//   width: 300px;
//   height: 100px;
//   margin-top: 10px;
//   margin-left: 3rem;
//   background-image: url(${process.env.PUBLIC_URL}/mirlogo.png);
//   background-size: contain;
//   background-repeat: no-repeat;
// `;
// const Nav = styled.nav`
//   justify-content: flex-end;
//   display: flex;
//   align-items: center;
//   padding: 0.5rem;
//   background-color: #white;
// `;

// const NavMenu = styled.ul`
//   display: flex;
//   list-style: none;
//   margin-left: auto;
//   font-family: DAE;
// `;

// const NavItem = styled.li`
//   margin-right: auto;
//   margin-left: 5rem;
//   color: 231656;
//   cursor: pointer;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const LoginNavItem = styled(NavItem)`
//   margin-right: 5rem;
// `;

export default Header;
