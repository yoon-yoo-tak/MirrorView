import styled from "styled-components";

export const modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 420px;
    height: 240px;
    padding: 20px;
    background-color: #fff;
    border-radius: 19px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    font-size: 20px;

    font-family: "HakgyoansimWoojuR";
`;

export const head = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 17px;
`;

export const title = styled.div``;

export const userInfo = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 20px;
`;
export const infoBox = styled.div`
    margin: 0 10px 0 20px;
    min-width: 200px;
`;

export const userName = styled.div`
    font-weight: bold;
    margin-bottom: 15px;
`;

export const infoContent = styled.div`
    display: flex;
    font-size: 17px;
`;

export const infoTap = styled.div`
    margin-right: 20px;
`;

export const infoTapDetail = styled.div`
    // margin-right: 20px;
    min-width: 150px;
`;

export const text = styled.div`
    margin: 15px 0;
`;

export const btnWrap = styled.div`
    display: flex;
    justify-content: center;
`;

export const enterbtn = styled.div`
    cursor: pointer;

    margin: 3px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;

    width: 75px;
    height: 30px;

    font-size: 17px;
    // color: white;
    font-weight: bold;

    background: #ffb1bb;
    box-shadow: 0px 0px 10px #bdbdbd;
    border-radius: 15px;
    cursor: pointer;
    &:hover {
        color: white;
    }
`;

export const closeBtn = styled.div`
    cursor: pointer;
    font-weight: bold;
`;
