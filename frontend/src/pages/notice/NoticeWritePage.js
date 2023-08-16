import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as S from "../../components/notice/NoticeWriteComponent";
import { useSelector } from "react-redux";
import axios from "axios";

import Header from "../../components/common/HeaderComponent";
import Footer from "../../components/common/FooterComponent";

const NoticeWritePage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const onClickWrittenButton = async () => {
        await axios
            .post("/api/board", {
                title,
                content,
            })
            .then(({ data }) => {
                alert("작성 완료");
                navigate("/notice");
            })
            .catch((error) => {
                //console.error(error);
            });
    };
    return (
        <div>
            <Header />
            <S.Container>
                <S.Image src="/bground.png" alt="main_bg" />
                <S.Noticebox>
                    <S.TitleInput
                        type="text"
                        placeholder="제목을 입력하세요"
                        onChange={handleTitle}
                    />
                    <S.ContentInput
                        placeholder="내용을 입력하세요"
                        onChange={handleContent}
                    />
                    <S.ButtonWrapper>
                        <S.Button onClick={onClickWrittenButton}>
                            작성 완료
                        </S.Button>
                    </S.ButtonWrapper>
                </S.Noticebox>
            </S.Container>
            <Footer />
        </div>
    );
};

export default NoticeWritePage;
