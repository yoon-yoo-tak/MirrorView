import { useNavigate } from "react-router-dom";
import { login, getUserInfo } from "../../store/AuthStore";
import * as S from "../../components/auth/UserStyledComponents";
import axios from "axios";

import Header from "../../components/common/HeaderComponent";
import Footer from "../../components/common/FooterComponent";

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect, useContext } from "react";
import { globalSubscribe } from "store/GlobalStore";
import { WebSocketContext } from "WebSocketContext";

const Login = () => {
  const { client } = useContext(WebSocketContext);
  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { id, password, user, accessToken } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = useCallback(
    (e) => {
      console.log("들어옴");
      e.preventDefault();
      dispatch(
        login({
          userId: inputId,
          password: inputPassword,
        })
      )
        .unwrap()
        .then(async ({ data }) => {
          console.log(data);
          dispatch(getUserInfo(data["access-token"]));
        })
        .catch((error) => {
          console.log(error);
          alert("회원 정보가 존재하지 않습니다."); //todo 이쁜 거로 바꾸기 sweetalert (?)
        });
    },
    [inputId, inputPassword]
  );

  const handleId = useCallback((e) => {
    setInputId(e.target.value);
  }, []);

  const handlePassword = useCallback((e) => {
    setInputPassword(e.target.value);
  }, []);

  const notAllow = !id || !password;

  // const onClickLogin = useCallback(
  //     (e) => {
  //         dispatch(
  //             login({
  //                 userId: inputId,
  //                 password: inputPassword,
  //             })
  //         );
  //     },
  //     [inputId, inputPassword]
  // );

  const goSignUpPage = () => {
    navigate("/signup");
  };

  const goFindIDPage = () => {
    navigate("/findid");
  };

  const goFindPasswordPage = () => {
    navigate("/findpassword");
  };

  const onClickKakaoLogin = (e) => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  };

    return (
        <div>
            <Header />
            <S.form>
                <form onSubmit={handleSubmit}>
                    <S.page>
                        <S.wrap>
                            <S.pageTitle>LOGIN</S.pageTitle>
                            <S.contentWrap>
                                <S.inputTitle>ID</S.inputTitle>
                                <S.inputWrap>
                                    <S.inputContent
                                        type="text"
                                        className="input"
                                        placeholder="아이디를 입력해주세요"
                                        onChange={handleId}
                                    />
                                </S.inputWrap>

                            <S.inputTitle>PASSWORD</S.inputTitle>
                            <S.inputWrap>
                                <S.inputContent
                                    type="password"
                                    className="input"
                                    onChange={handlePassword}
                                    placeholder="비밀번호를 입력해주세요"
                                />
                            </S.inputWrap>
                            <S.textWrap>
                                <S.findWrap>
                                    <S.findInfo onClick={goFindIDPage}>
                                        아이디 찾기
                                    </S.findInfo>
                                    &nbsp; | &nbsp;
                                    <S.findInfo onClick={goFindPasswordPage}>
                                        비밀번호 찾기
                                    </S.findInfo>
                                </S.findWrap>
                                <S.goSignUp onClick={goSignUpPage}>
                                    계정이 없으신가요?
                                </S.goSignUp>
                            </S.textWrap>
                            <S.goLoginWrap>
                                <S.submitButton
                                    // disabled={notAllow}
                                    // className="bottomButton"
                                    onClick={handleSubmit}
                                >
                                    로그인
                                </S.submitButton>

                                    <S.kakaoLogin
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/kakao_login_medium_narrow.png"
                                        }
                                        alt="kakao_login"
                                        onClick={onClickKakaoLogin}
                                    />
                                </S.goLoginWrap>
                            </S.contentWrap>
                        </S.wrap>
                    </S.page>
                </form>
            </S.form>

            <Footer />
        </div>
    );
};

export default Login;
