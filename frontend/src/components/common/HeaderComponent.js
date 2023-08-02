import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../store/AuthStore";
const Header = () => {
    const {user} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const onClickLogout = (e) =>{
        dispatch(logout());
    }
    return (
        <Nav>
            <Link to="/">
                {" "}
                {/* 이 부분이 추가되었습니다 */}
                <Logo></Logo>
            </Link>
            <NavMenu>
                <NavItem>
                    <StyledLink to="/aboutus">About us</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/notice">Notice</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/studylist">StudyList</StyledLink>
                </NavItem>
                <NavItem>
                    <StyledLink to="/mypage/profile">MyPage</StyledLink>
                </NavItem>
                <LoginNavItem>
                    {!user ? (
                        <>
                            <NavItem>
                                <StyledLink to="/login">로그인</StyledLink>
                            </NavItem>
                        </>):(
                        <NavItem>
                            <StyledLink to="/" onClick={onClickLogout}>로그아웃</StyledLink>
                        </NavItem>
                    )}
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
  font-family: Imcre;
`;

const NavItem = styled.li`
  margin-right: auto;
  margin-left: 5rem;
  cursor: pointer;
`;

const LoginNavItem = styled(NavItem)`
  margin-right: 5rem;
`;

const StyledLink = styled(Link)`
  color: #231656;
  text-decoration: none; /* 밑줄 없애기 */

  &:hover {
    text-decoration: underline;
  }
`;

export default Header;
