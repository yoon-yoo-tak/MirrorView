import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNickname } from "../../store/AuthStore";
import * as S from "./MypageStyledComponents";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";
import Swal from "sweetalert2";

const ChangeNicknameComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newNickname, setNewNickname] = useState("");
  const [nicknameValid, setNicknameValid] = useState(null);
  const { user, refreshToken } = useSelector((state) => state.auth);

  axios.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;

  const handleNickname = (e) => {
    setNewNickname(e.target.value);
    setNicknameValid(false);
  };
  const notifier = new AWN();

  const onClickVaildNickname = async (e) => {
    if (newNickname.length >= 15) {
      Swal.fire({
        icon: "error",
        title:
          '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">14자 이하의 닉네임만 가능합니다.<div>',
      });
      return;
    }

    await axios
      .get(`/api/users/${newNickname}/check-nickname`)
      .then((response) => {
        // alert("사용가능한 닉네임입니다.");
        Swal.fire({
          // icon: 'error',
          width: 400,
          title:
            '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">사용 가능한 닉네임입니다<div>',
        });
        setNicknameValid(true);
      })
      .catch((error) => {
        // console.error(error);
        // alert("사용 불가능한 아이디입니다.");
        Swal.fire({
          icon: "error",
          width: 400,
          title:
            '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">사용 불가능한 닉네임입니다<div>',
        });
        setNicknameValid(false);
      });
  };
  const changeNickname = async (e) => {
    if (!nicknameValid) {
      alert("중복확인 필요");
      return;
    }
    await axios
      .post(`/api/mypage/nickname?nickname=${newNickname}`)
      .then((response) => {
        notifier.success("닉네임 변경 완료!", {
          durations: { success: 3000 },
        });
        dispatch(setNickname(newNickname));
        navigate("/mypage/profile");
      })
      .catch((error) => {
        // console.error(error);
      });
  };
  return (
    <div>
      <S.changeInput2
        placeholder=" 변경할 닉네임을 입력하세요"
        onChange={handleNickname}
      />
      <S.btn2 onClick={onClickVaildNickname}>중복확인</S.btn2>
      <S.btn3 disabled={!nicknameValid} onClick={changeNickname}>
        변경
      </S.btn3>
      <S.comment>새로운 닉네임</S.comment>
    </div>
  );
};

export default ChangeNicknameComponent;
