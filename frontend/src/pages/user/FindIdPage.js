import { dividerClasses } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import * as S from "../../components/auth/UserStyledComponents";

const FindId = () => {
    const [inputEmail, setInputEmail] = useState("");
    const [foundId, setFoundId] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .get("http://localhost:8000/api/users/find/id", {
                params: {
                    email: inputEmail,
                },
            })
            .then((response) => {
                console.log(response.data);
                setFoundId(response.data.data);
                alert("Your ID : " + response.data.data);
                setError(null);
            })
            .catch((error) => {
                console.log(error);
                setError("이메일 찾기에 실패했습니다.");
                setFoundId("");
            });
    };

    return (
        <S.loginForm>
            <form onSubmit={handleSubmit}>
                <S.page>
                    <S.wrap>
                        <h2>개인회원 ID찾기</h2>
                        <h3>가입시 입력한 이메일을 입력해주세요</h3>
                        <S.contentWrap>
                            <S.inputTitle>E-MAIL</S.inputTitle>
                            <S.inputWrap>
                                <S.inputEmailContent
                                    type="email"
                                    className="input"
                                    placeholder="E-MAIL을 입력해주세요"
                                    value={inputEmail}
                                    onChange={(e) =>
                                        setInputEmail(e.target.value)
                                    }
                                />
                            </S.inputWrap>
                        </S.contentWrap>
                        <div>
                            <S.submitButton
                                className="bottomButton"
                                // onClick={handleSubmit}
                            >
                                찾기
                            </S.submitButton>
                        </div>
                    </S.wrap>
                </S.page>
            </form>
            {foundId && <p>찾은 아이디 : {foundId}</p>}
            {error && <p>{error}</p>}
        </S.loginForm>
    );
};

export default FindId;
