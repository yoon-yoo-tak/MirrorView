import React from "react";
import { Link, useParams  } from "react-router-dom";
import * as S from "../../components/notice/NoticeWriteComponent";



const NoticeWritePage = () => {


  return (
    <S.Container>
      <S.Image src="/bground.png" alt="main_bg" />
      <S.Noticebox>
        <S.TitleInput type="text" placeholder="제목을 입력하세요" />
        <S.ContentInput placeholder="내용을 입력하세요" />
        <S.ButtonWrapper>
        <Link to="/notice">
        <S.Button>작성 완료</S.Button>
          </Link>
        </S.ButtonWrapper>
      </S.Noticebox>
    </S.Container>
  );


};


export default NoticeWritePage;