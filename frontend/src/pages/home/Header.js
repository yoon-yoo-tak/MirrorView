import React from "react";
import styled from "styled-components";

const Header = () => {
    return (
        <Nav>
            <Logo></Logo>
            <NavMenu>
                <NavItem>About us</NavItem>
                <NavItem>Features</NavItem>
                <NavItem>Pricing</NavItem>
                <NavItem>Blog</NavItem>
                <LoginNavItem>
                    <NavItem>로그인</NavItem>
                </LoginNavItem>
            </NavMenu>
        </Nav>
    );
};

const Logo = styled.div`
    width: 300px;
    height: 100px;
    margin-top: 10px;
    margin-left: 3rem;
    background-image: url(${process.env.PUBLIC_URL}/mirlogo.png);
    background-size: contain;
    background-repeat: no-repeat;
`;
const Nav = styled.nav`
    justify-content: flex-end;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background-color: #white;
`;

const NavMenu = styled.ul`
    display: flex;
    list-style: none;
    margin-left: auto;
    font-family: DAE;
`;

const NavItem = styled.li`
    margin-right: auto;
    margin-left: 5rem;
    color: 231656;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const LoginNavItem = styled(NavItem)`
    margin-right: 5rem;
`;

export default Header;
