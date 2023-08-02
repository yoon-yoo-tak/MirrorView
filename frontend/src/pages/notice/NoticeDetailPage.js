import React from "react";
import { Link, useParams  } from "react-router-dom";
import data from "./Data";
import * as S from "../../components/notice/NoticeDetailComponent";


const NoticeDetail = () => {

  // 게시글의 ID를 매개변수로 가져오기
  const { id } = useParams();
  // 게시글 ID에 해당하는 데이터 가져오기
  const post = data.find((item) => item.id === parseInt(id));

  if(!post) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>
  }


  return (
    <S.Container>
      <S.Image src="/bground.png" alt="main_bg" />
      <S.Noticebox>
        {/* 게시글 상세 정보를 보여주는 부분 */}
        <S.Title>{post.title}</S.Title>
        <S.InfoWrapper>
          <S.Info>
            <S.Author>{post.author}</S.Author>
            <S.Divider>|</S.Divider>
            <S.Date>{post.date}</S.Date>
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
  );
};

export default NoticeDetail;
