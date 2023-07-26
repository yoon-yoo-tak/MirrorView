import { styled } from "styled-components";

import pfImage from "../../assets/sidebar/🦆 icon _person outline_.png";
import pcImage from "../../assets/sidebar/🦆 icon _people outline_.png";
import fbImage from "../../assets/sidebar/🦆 icon _book open outline_.png";
import essayImage from "../../assets/sidebar/🦆 icon _file text outline_.png";

export const sidebarWrap = styled.div`
    background-image: url(${process.env.PUBLIC_URL}/sidebar-background.png);
    width: 280px;
    height: 855px;
    flex: 1;
`;

export const sideMenuWrap = styled.div`
    padding: 30px 0 0 20px;
`;

export const sideMenu = styled.div`
    height: 27px;
    display: flex;
    // align-items: left;
    justify-content: left;
    font-size: 15px;
    padding: 15px 5px;
    display: flex;
    align-items: center;
    border-radius: 30px 0 0 30px;
    font-family: "Nanum Gothic";
`;

export const sideMenuNow = styled.div`
    height: 27px;
    display: flex;
    // align-items: left;
    justify-content: left;
    font-size: 15px;
    padding: 15px 5px;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 30px 0 0 30px;
    font-family: "Nanum Gothic";
`;

export const icons = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 10px;
`;

export const pf_icon = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 10px;
    background-image: url(${pfImage});
    background-size: cover;
`;

export const pc_icon = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 10px;
    background-image: url(${pcImage});
    background-size: cover;
`;

export const fb_icon = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 10px;
    background-image: url(${fbImage});
    background-size: cover;
`;

export const es_icon = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 10px;
    background-image: url(${essayImage});
    background-size: cover;
`;

export const page = styled.div`
    display: flex;
    justify-content: center;
    font-family: "HakgyoansimWoojuR";
`;

export const wrap = styled.div`
    flex: 4;
    margin: 30px 50px;
`;

export const profilePage = styled.div`
    display: flex;
    justify-content: center;
    font-family: "HakgyoansimWoojuR";
`;

export const profileWrap = styled.div`
    flex: 4;
    margin: 30px 50px;
`;

export const profileImage = styled.div``;

export const profileInfo = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`;

export const profileKey = styled.div`
    flex: 1;
`;

export const profileDetail = styled.div`
    flex: 2;
`;

export const profileUpdate = styled.div``;
export const profileBox = styled.div``;

export const modalContainer = styled.div`
    /* 모달창 크기 */
    width: 300px;
    height: 200px;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
    /* translate는 본인의 크기 기준으로 작동한다. */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* 모달창 디자인 */
    background-color: rgb(244, 242, 250);
    // border: 5px solid rgb(83, 78, 156);
    border-radius: 8px;
`;

export const modalButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
`;
