import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/AuthStore";
const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const onClickLogout = (e) => {
        alert("로그아웃 되었습니다!");
        dispatch(logout());
        navigate("");
    };
    const navigate = useNavigate();

    const movePage = (props) => {
        navigate(`/${props}`);
    };

    return (
        <Nav>
            <Link to="/">
                {" "}
                {/* 이 부분이 추가되었습니다 */}
                <Logo></Logo>
            </Link>
            <NavMenu>
                {/* <StyledLink to="/aboutus">About us</StyledLink> */}
                <NavItem onClick={() => movePage("aboutus")}>About us</NavItem>
                <NavItem onClick={() => movePage("notice")}>Notice</NavItem>
                <NavItem onClick={() => movePage("studylist")}>
                    StudyList
                </NavItem>
                <NavItem onClick={() => movePage("mypage/profile")}>
                    MyPage
                </NavItem>
                <LoginNavItem>
                    {!user ? (
                        <NavItem onClick={() => movePage("login")}>
                            로그인
                        </NavItem>
                    ) : (
                        <NavItem onClick={onClickLogout}>로그아웃</NavItem>
                    )}
                </LoginNavItem>
            </NavMenu>
        </Nav>
    );
};

const Logo = styled.div`
    // width: 18.75rem;
    // height: 6.25rem;
    width: 200px;
    height: 60px;
    // object-fit: contain;
    margin-left: 40px;
    background-image: url(${process.env.PUBLIC_URL}/mirlogo.png);
    background-size: contain;
    background-repeat: no-repeat;
`;

const Nav = styled.div`
    justify-content: flex-end;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background-color: white;
    height: 60px;
`;

const NavMenu = styled.div`
    display: flex;
    list-style: none;
    margin-left: auto;
`;

const NavItem = styled.div`
    margin-right: auto;
    //   margin-right : 80px;
    margin-left: 5rem;
    cursor: pointer;
    font-family: "NanumSquareNeo-Variable";
    font-weight: bold;
    &:hover {
        color: gray;
    }
`;

const LoginNavItem = styled(NavItem)`
    margin-right: 5rem;
`;

// const StyledLink = styled(Link)`
//     color: #231656;
//     text-decoration: none; /* 밑줄 없애기 */

//     &:hover {
//         text-decoration: underline;
//     }
// `;

export default Header;
