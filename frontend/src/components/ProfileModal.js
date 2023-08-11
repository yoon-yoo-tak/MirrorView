import * as S from "./otherStyledComponents";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useContext } from "react";
import { WebSocketContext } from "WebSocketContext";

const ProfileModal = ({ isOpen, onClose, member }) => {
  const { client } = useContext(WebSocketContext);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { user } = useSelector((state) => state.auth);

  const [nowProfile, setNowProfile] = useState({
    nickname: "",
    score: "",
    email: "",
    photo: "",
  });
  const [friendStatus, setFriendStatus] = useState("");
  const [myProfile, setMyProfile] = useState(false);

  useEffect(() => {
    console.log(member);
    if (member.userId === user.userId) {
      setNowProfile({
        nickname: `${user.nickname}`,
        score: `${user.averageRating}`,
        email: `${user.email}`,
        photo: `${user.photo}`,
      });
      return;
    }
    axios
      .get(`api/users/find/${member.nickname}`)
      .then(({ data }) => setNowProfile(data.data))
      .catch((error) => console.log(error));
    axios
      .get(`api/friends/status/${member.userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response.data.data);
        console.log("친구상태 확인완");
        setFriendStatus(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteFriend = () => {
    // 친구삭제
    if (friendStatus === "wait") {
      if (window.confirm("친구 요청을 취소하시겠습니까?")) {
        axios
          .delete(`api/friends/${member.userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((response) => {
            console.log(response.data.msg);
            alert("친구요청이 취소되었습니다");

            setFriendStatus("none");
          })
          .catch((error) => {
            console.error(error);
            console.log("취소 실패");
          });
      }
    } else if (friendStatus === "connect") {
      if (window.confirm("친구를 삭제하시겠습니까?")) {
        axios
          .delete(`api/friends/${member.userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((response) => {
            console.log(response.data.msg);
            alert("친구가 삭제되었습니다");

            setFriendStatus("none");
          })
          .catch((error) => {
            console.error(error);
            console.log("취소 실패");
          });
      }
    }
  };

  const requestFriend = () => {
    // 친구신청
    axios
      .post(`api/friends/request/${member.userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response.data.msg);
        alert(`${nowProfile.nickname}님에게 친구를 신청했습니다!`);
        setFriendStatus("wait");
      })
      .catch((error) => {
        console.error(error);
        console.log("요청 실패");
      });

    // 친구 신청 알람
    const globalMessageDto = {
      type: "FRIEND_REQUEST",
      data: {
        fromUser: user.nickname,
        toUser: nowProfile.nickname,
      },
    };
    console.log(globalMessageDto);
    client.send(`/app/global.one`, {}, JSON.stringify(globalMessageDto));
  };

  const acceptFriend = () => {
    // 친구 수락
    axios
      .patch(`api/friends/request/${member.userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response.data.msg);
        alert(`${nowProfile.nickname}님과 친구가 되었습니다!`);
        setFriendStatus("connect");
      })
      .catch((error) => {
        console.error(error);
        console.log("수락 실패");
      });
  };

  const imageStyle = {
    width: "110px",
    height: "110px",
    filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4))",
    borderRadius: "50%",
    marginTop: "30px",
  };

  return (
    <S.modal>
      <S.head>
        <S.title>사용자 정보</S.title>
        <S.closeBtn onClick={onClose}>X</S.closeBtn>
      </S.head>
      <div>
        <S.userInfo>
          <img src={nowProfile.photo} alt="profileImage" style={imageStyle} />
          <S.infoBox>
            <S.userName>{nowProfile.nickname}</S.userName>
            <S.infoContent>
              <S.infoTap>
                <S.text>E-MAIL</S.text>
                <S.text>평점</S.text>
              </S.infoTap>
              <S.infoTapDetail>
                <S.text>{nowProfile.email}</S.text>
                <S.text>{nowProfile.score}</S.text>
              </S.infoTapDetail>
            </S.infoContent>
          </S.infoBox>
        </S.userInfo>
      </div>
      <S.btnWrap>
        {friendStatus === "connect" && (
          <S.enterbtn onClick={deleteFriend}>친구삭제</S.enterbtn>
        )}
        {friendStatus === "wait" && (
          <S.enterbtn onClick={deleteFriend}>친구취소</S.enterbtn>
        )}
        {friendStatus === "none" && (
          <S.enterbtn onClick={requestFriend} value="request">
            친구신청
          </S.enterbtn>
        )}
        {friendStatus === "receive" && (
          <S.enterbtn onClick={acceptFriend} value="accept">
            친구수락
          </S.enterbtn>
        )}
      </S.btnWrap>
    </S.modal>
  );
};

export default ProfileModal;
