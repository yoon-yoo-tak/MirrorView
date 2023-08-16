import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import data from "./Data";
import * as S from "../../components/notice/NoticeDetailComponent";
import axios from "axios";
import Header from "../../components/common/HeaderComponent";
import Footer from "../../components/common/FooterComponent";
const NoticeDetail = () => {
    // 게시글의 ID를 매개변수로 가져오기
    const { id } = useParams();
    useEffect(() => {
        axios.get(`/api/board/${id}`).then(({ data }) => {
            //console.log(data);
            setPost(data.data);
        });
    }, []);
    // 게시글 ID에 해당하는 데이터 가져오기
    const [post, setPost] = useState(null);

    if (!post) {
        return <div>해당 게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            <Header />
            <S.Container>
                <S.Image src="/bground.png" alt="main_bg" />
                <S.Noticebox>
                    {/* 게시글 상세 정보를 보여주는 부분 */}
                    <S.Title>{post.title}</S.Title>
                    <S.InfoWrapper>
                        <S.Info>
                            <S.Author>{post.userId}</S.Author>
                            <S.Divider>|</S.Divider>
                            <S.Date>{post.createdTime.substring(0, 10)}</S.Date>
                        </S.Info>
                        <S.InfoLine />
                    </S.InfoWrapper>
                    <S.Content>{post.content}</S.Content>
                    <S.ContentLine />
                    <S.ButtonWrapper>
                        <Link to="/notice">
                            <S.Button>목록</S.Button>
                        </Link>
                    </S.ButtonWrapper>
                </S.Noticebox>
            </S.Container>
            <Footer />
        </div>
    );
};

export default NoticeDetail;
