import React, { useState } from "react";
import Sidebar from "../MypageSidebarPage";
import * as S from "../../../components/mypage/MypageStyledComponents";
import essayData from "./essayData";

const EssayCreatePage = () => {
  const itemsPerPage = 1; // 1개씩 보여주도록 변경
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = essayData.length;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <S.page>
        <Sidebar menu="essay" />
        <S.wrap>
          <h2>자기소개서 작성하기</h2>
          <hr />
          <div>

            {essayData
              .filter((essay) => essay.id === currentPage)
              .map((essay) => (
                <S.EssayFormContainer key={essay.id}>
                  <div className="essayCreateBox">
              
            <S.btn theme="save" style={{ position: "relative", top: "5px", left: "1040px" }}>
               저장하기
            </S.btn> 
                    <S.essayCreateBox>
                      <S.esaayCategory>
                        <S.RoundedTextareaQues placeholder={essay.company}></S.RoundedTextareaQues>
                      </S.esaayCategory>

                      <S.esaayQuestion>
                        <S.RoundedTextareaQues placeholder={essay.title}></S.RoundedTextareaQues>
                      </S.esaayQuestion>

                      <S.essayAnswer>
                        <S.RoundedTextareaAns placeholder={essay.content}></S.RoundedTextareaAns>
                      </S.essayAnswer>

                      <S.btn theme="save" style={{ position: "relative", top: "-5px", left: "990px" }}>문항 추가</S.btn>
                 
                 <S.PaginationContainer>
                       {[...Array(totalPages).keys()].map((page) => (
                       <S.PaginationButton key={page + 1} onClick={() => goToPage(page + 1)}>
                       <S.CircleNumber>{page + 1}</S.CircleNumber>
                       </S.PaginationButton>
                        ))}
                       </S.PaginationContainer>
                 
                    </S.essayCreateBox>
                  </div>
                </S.EssayFormContainer>
              ))}
          </div>
        </S.wrap>
      </S.page>
    </div>
  );
};

export default EssayCreatePage;