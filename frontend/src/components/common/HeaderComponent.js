import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../../store/AuthStore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import friends from "../../assets/adduser-image.png";
import chat from "../../assets/chatting.png";
import myInfo from "../../assets/person-image.png";
import Sidebar from "pages/sidebar/SideBar";
import SidebarChat from "pages/sidebar/SidebarChat";
import SidebarFriends from "pages/sidebar/SideBarFriends";
import SidebarSearch from "pages/sidebar/SideBarSearch";
import ChatList from "pages/sidebar/ChatList";
import PrivateChatRoom from "pages/sidebar/ChatRoom";
import Search from "../../assets/searchicon.png";

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

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [clickFriends, setClickFriends] = useState(false);
    const [clickChat, setClickChat] = useState(false);
    const [clickSearch, setClickSearch] = useState(false);
    const handleFriendsSideBar = () => {
        setClickFriends(true);
    };

    const handleChatSidebar = () => {
        setClickChat(true);
    };

    const handleSearchSidebar = () => {
        setClickSearch(true);
    };

    const openSearch = () => {
        // console.log("사람찾아요");
    };

    const font = {
        fontFamily: "HakgyoansimWoojuR",
    };

    return (
        <div>
            <Nav>
                <Link to="/">
                    {" "}
                    {/* 이 부분이 추가되었습니다 */}
                    <Logo></Logo>
                </Link>
                <NavMenu>
                    {/* <StyledLink to="/aboutus">About us</StyledLink> */}
                    <NavItem onClick={() => movePage("aboutus")}>
                        About us
                    </NavItem>
                    <NavItem onClick={() => movePage("notice")}>Notice</NavItem>
                    <NavItem onClick={() => movePage("studylist")}>
                        StudyList
                    </NavItem>
                    {/* <NavItem onClick={() => movePage("mypage/profile")}>
                    MyPage
                </NavItem> */}
                    <LoginNavItem>
                        {!user ? (
                            <NavItem onClick={() => movePage("login")}>
                                로그인
                            </NavItem>
                        ) : (
                            <IconArea>
                                <MyIcon
                                    onClick={handleClick}
                                    aria-controls={
                                        open ? "account-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                ></MyIcon>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: "visible",
                                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                            mt: 1.5,
                                            "& .MuiAvatar-root": {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            "&:before": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: "background.paper",
                                                transform:
                                                    "translateY(-50%) rotate(45deg)",
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{
                                        horizontal: "right",
                                        vertical: "top",
                                    }}
                                    anchorOrigin={{
                                        horizontal: "right",
                                        vertical: "bottom",
                                    }}
                                >
                                    <MenuItem style={font}>
                                        {user.nickname}님
                                        <br /> 반갑습니다!
                                    </MenuItem>

                                    <Divider />

                                    <MenuItem
                                        style={font}
                                        onClick={() =>
                                            movePage("mypage/profile")
                                        }
                                    >
                                        마이페이지
                                    </MenuItem>
                                    <MenuItem
                                        style={font}
                                        onClick={onClickLogout}
                                    >
                                        로그아웃
                                    </MenuItem>
                                </Menu>
                                <FriendsIcon onClick={handleFriendsSideBar} />
                                <ChatIcon onClick={handleChatSidebar} />
                                <SearchIcon onClick={handleSearchSidebar} />
                            </IconArea>
                        )}
                    </LoginNavItem>
                </NavMenu>
            </Nav>
            <SidebarFriends
                setClickFriends={setClickFriends}
                clickFriends={clickFriends}
            ></SidebarFriends>
            <SidebarChat clickChat={clickChat} setClickChat={setClickChat}>
                <ChatList />
                <PrivateChatRoom />
            </SidebarChat>
            <SidebarSearch
                clickSearch={clickSearch}
                setClickSearch={setClickSearch}
            />
        </div>
    );
};

const Logo = styled.div`
    // width: 18.75rem;
    // height: 6.25rem;
    width: 180px;
    height: 60px;
    // object-fit: contain;
    margin: 10px 0 0 40px;
    background-image: url(${process.env.PUBLIC_URL}/mirlogo.png);
    background-size: contain;
    background-repeat: no-repeat;
`;

const Nav = styled.div`
    justify-content: flex-end;
    display: flex;
    align-items: center;
    padding: 0;
    background-color: white;
    height: 60px;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    z-index: 1000;
`;

const NavMenu = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
`;

const NavItem = styled.div`
    margin-right: auto;
    //   margin-right : 80px;
    margin-left: 2rem;
    min-width: 100px;
    font-size: 13px;
    font-family: "NanumSquareNeo-Variable";
    font-weight: bold;
    cursor: pointer;
    &:hover {
        color: gray;
    }
`;

const LoginNavItem = styled.div`
    margin-right: 2rem;
`;

const IconArea = styled.div`
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    min-width: 120px;
`;

const ChatIcon = styled.div`
    background-image: url(${chat});
    background-size: cover;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.2);
    }
`;

const FriendsIcon = styled.div`
    background-image: url(${friends});
    background-size: cover;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.2);
    }
`;

const SearchIcon = styled.div`
    background-image: url(${Search});
    background-size: cover;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.2);
    }
`;

const MyIcon = styled.div`
    background-image: url(${myInfo});
    background-size: cover;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.2);
    }
`;

// const StyledLink = styled(Link)`
//     color: #231656;
//     text-decoration: none; /* 밑줄 없애기 */

//     &:hover {
//         text-decoration: underline;
//     }
// `;

export default Header;
