import { dividerClasses } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import * as S from "../../components/auth/UserStyledComponents";

const FindPassword = () => {
    const [inputUserId, setInputUserId] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .get("/api/users/find/password", {
                params: {
                    userId: inputUserId,
                    email: inputEmail,
                },
            })
            .then((response) => {
                console.log(response.data.msg);
                setMessage(response.data.msg);
                alert("Status : " + response.data.msg);
                setError(null);
            })
            .catch((error) => {
                console.log(error);
                setError("이메일 전송 실패!");
            });
    };

    return (
        <S.form>
            <form onSubmit={handleSubmit}>
                <S.page>
                    <S.wrap>
                        <h2>비밀번호 찾기</h2>
                        <h3>가입시 입력한 이메일을 입력해주세요</h3>
                        <S.contentWrap>
                            <S.inputTitle>ID</S.inputTitle>
                            <S.inputWrap>
                                <S.inputContent
                                    type="text"
                                    className="input"
                                    placeholder="ID를 입력해주세요"
                                    value={inputUserId}
                                    onChange={(e) =>
                                        setInputUserId(e.target.value)
                                    }
                                />
                            </S.inputWrap>
                            <S.inputTitle>E-MAIL</S.inputTitle>
                            <S.inputWrap>
                                <S.inputContent
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
            {message && <p>Status : {message}</p>}
            {error && <p>{error}</p>}
        </S.form>
    );
};

export default FindPassword;
