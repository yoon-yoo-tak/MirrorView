import { useNavigate } from "react-router-dom";
import  { login, getUserInfo } from "../../store/AuthStore";
import * as S from "../../components/auth/UserStyledComponents";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";

const Login = () => {
    const [inputId, setInputId] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const { id, password,user,accessToken } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if (user) {
            navigate("/");
        }
 
    }, [user]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(
            login({
                userId : inputId,
                password : inputPassword
            })
        ).unwrap().then(({data})=>{
            console.log(data)
            dispatch(getUserInfo(data["access-token"]));
        }).catch((error)=>{
            console.log(error);
            alert("회원 정보가 존재하지 않습니다."); //todo 이쁜 거로 바꾸기 sweetalert (?)
        })
    },[inputId,inputPassword]);

    const handleId = useCallback((e)=>{
        setInputId(e.target.value);
    },[]);

    const handlePassword = useCallback((e)=>{
        setInputPassword(e.target.value);
    },[]);

    const notAllow = !id || !password;

    const onClickLogin = useCallback((e) => {
        dispatch(
            login({
                userId : inputId,
                password : inputPassword
            })
        );
    },[inputId,inputPassword]);

    const onClickKakaoLogin = (e) =>{
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`
    }

    return (
        <S.loginForm>
            <form onSubmit={handleSubmit}>
                <S.page>
                    <S.wrap>
                        <h2>LOGIN</h2>
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
                        </S.contentWrap>

                        <div>
                            <S.submitButton
                                // disabled={notAllow}
                                className="bottomButton"
                                // onClick={onClickLogin}
                            >
                                로그인
                            </S.submitButton>
                            <hr/>
                            <div>또는</div>
                
                            <img
                            src={process.env.PUBLIC_URL + "/kakao_login_medium_narrow.png"}
                            alt="kakao_login"
                            onClick={onClickKakaoLogin}>
                            </img>
                
                        </div>
                    </S.wrap>
                </S.page>
            </form>
        </S.loginForm>
    );
};

export default Login;