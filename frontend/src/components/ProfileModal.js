import * as S from "./otherStyledComponents";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ReportModalComponent from "./ReportModalComponent";
import Swal from "sweetalert2";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";
import { WebSocketContext } from "WebSocketContext";

const ProfileModal = ({ isOpen, setIsOpen, onClose, member }) => {
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
  const notifier = new AWN();
  const [friendChatComponent, setFriendChatComponent] = useState(false);

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
      // if (window.confirm("친구 요청을 취소하시겠습니까?")) {
      //     axios
      //         .delete(`api/friends/${member.userId}`, {
      //             headers: { Authorization: `Bearer ${accessToken}` },
      //         })
      //         .then((response) => {
      //             console.log(response.data.msg);
      //             alert("친구요청이 취소되었습니다");

      //             setFriendStatus("none");
      //         })
      //         .catch((error) => {
      //             console.error(error);
      //             console.log("취소 실패");
      //         });
      // }
      Swal.fire({
        title:
          '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">친구 요청을 취소하시겠습니까?<div>',
        icon: "question",
        width: 400,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#D4D4D4",
        cancelButtonText: "취소",
        confirmButtonText: "넹",
        // buttons: true,
        // dangerMode: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`api/friends/${member.userId}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => {
              console.log(response.data.msg);
              // alert("친구요청이 취소되었습니다");
              notifier.success("친구요청이 취소되었습니다", {
                durations: { success: 3000 },
              });

              setFriendStatus("none");
            })
            .catch((error) => {
              console.error(error);
              console.log("취소 실패");
            });
        } else if (result.isDenied) {
        }
      });
    } else if (friendStatus === "connect") {
      Swal.fire({
        title:
          '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">친구 요청을 취소하시겠습니까?<div>',
        icon: "question",
        width: 400,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#D4D4D4",
        cancelButtonText: "취소",
        confirmButtonText: "넹",
        // buttons: true,
        // dangerMode: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`api/friends/${member.userId}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => {
              console.log(response.data.msg);
              // alert("친구가 삭제되었습니다");
              notifier.success("친구가 삭제되었습니다", {
                durations: { success: 3000 },
              });

              setFriendStatus("none");
            })
            .catch((error) => {
              console.error(error);
              console.log("취소 실패");
            });
        } else if (result.isDenied) {
        }
      });
    }
  };

  const [openReport, setOpenReport] = useState(false);

  const goReport = (event) => {
    event.stopPropagation();
    if (window.confirm(`${nowProfile.nickname}님을 신고하시겠습니까?`)) {
      setOpenReport(true);
      handleClose();
    } else {
      handleClose();
    }
  };

  const requestFriend = () => {
    // 친구신청
    Swal.fire({
      title:
        '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">친구를 신청할까요? <div>',
      icon: "question",
      width: 400,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#D4D4D4",
      cancelButtonText: "취소",
      confirmButtonText: "넹",
      // buttons: true,
      // dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`api/friends/request/${member.userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((response) => {
            console.log(response.data.msg);
            // alert(`${nowProfile.nickname}님에게 친구를 신청했습니다!`);
            notifier.success(
              `${nowProfile.nickname}님에게 친구를 신청했습니다!`,
              {
                durations: { success: 3000 },
              }
            );
            setFriendStatus("wait");
            // 친구 신청 알람
            const globalMessageDto = {
              type: "FRIEND_REQUEST",
              data: {
                fromUser: user.nickname,
                toUser: nowProfile.nickname,
              },
            };
            console.log(globalMessageDto);
            client.send(
              `/app/global.one`,
              {},
              JSON.stringify(globalMessageDto)
            );
          })
          .catch((error) => {
            console.error(error);
            console.log("요청 실패");
          });
      } else if (result.isDenied) {
      }
    });

    // // 친구 신청 알람
    // const globalMessageDto = {
    //     type: "FRIEND_REQUEST",
    //     data: {
    //         fromUser: user.nickname,
    //         toUser: nowProfile.nickname,
    //     },
    // };
    // console.log(globalMessageDto);
    // client.send(`/app/global.one`, {}, JSON.stringify(globalMessageDto));
  };

  const acceptFriend = () => {
    // 친구 수락
    axios
      .patch(`api/friends/request/${member.userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response.data.msg);
        // alert(`${nowProfile.nickname}님과 친구가 되었습니다!`);
        notifier.success(`${nowProfile.nickname}님과 친구가 되었습니다!`, {
          durations: { success: 3000 },
        });
        setFriendStatus("connect");
      })
      .catch((error) => {
        console.error(error);
        console.log("수락 실패");
      });
  };

  const closeReport = () => {
    setOpenReport(false);
  };

  const modalRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleInsideClick = (event) => {
    event.stopPropagation();
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
    console.log(event.currentTarget);
  };
  const handleClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const openChat = () => {
    if (window.confirm(`${member.nickname}님과 1대1 채팅을 시작할까요?`)) {
      console.log("넹");

      const message = {
        type: 'GET_PRIVATE_ROOM',
        data: {
          toUser: member.nickname 
        }
      };
  
      
      client.send('/app/global.one', {}, JSON.stringify(message));
    }
  };

  const font = {
    fontFamily: "HakgyoansimWoojuR",
    height: "25px",
  };

  const imageStyle = {
    width: "110px",
    height: "110px",
    filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4))",
    borderRadius: "50%",
    marginTop: "20px",
    marginBottom: "10px",
  };

  return (
    <S.modal ref={modalRef} onClick={handleInsideClick}>
      <S.head>
        <S.title>사용자 정보</S.title>

        <S.etcBtn
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}></S.etcBtn>
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
                right: 9,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
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
          }}>
          <MenuItem style={font} onClick={openChat}>
            1 대 1 채팅하기
          </MenuItem>

          <Divider />

          {/* <MenuItem style={font}>친구신청관련</MenuItem> */}
          {friendStatus === "connect" && (
            <MenuItem style={font} onClick={deleteFriend}>
              친구삭제
            </MenuItem>
          )}
          {friendStatus === "wait" && (
            <MenuItem style={font} onClick={deleteFriend}>
              친구신청 취소
            </MenuItem>
          )}
          {friendStatus === "none" && (
            <MenuItem style={font} onClick={requestFriend} value="request">
              친구신청
            </MenuItem>
          )}
          {friendStatus === "receive" && (
            <MenuItem style={font} onClick={acceptFriend} value="accept">
              친구수락
            </MenuItem>
          )}

          <Divider />

          <MenuItem style={font} onClick={goReport}>
            신고
          </MenuItem>
        </Menu>
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
        <S.closeBtn onClick={onClose}>닫기</S.closeBtn>
      </S.btnWrap>
      {openReport && ( // <-- 추가
        <ReportModalComponent
          member={member}
          openReport={openReport}
          closeReport={closeReport}
        />
      )}
    </S.modal>
  );
};

export default ProfileModal;
