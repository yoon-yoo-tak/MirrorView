import React, { useEffect, useState } from "react";
import Sidebar from "../MypageSidebarPage";
import * as S from "../../../components/mypage/MypageStyledComponents";
import essayData from "./essayData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EssayCreatePage = () => {
  const itemsPerPage = 1; // 1개씩 보여주도록 변경
  const [currentPage, setCurrentPage] = useState(0);
  const [essayList,setEssayList]=useState({title:"",essayDetails:[]});
  const navigate = useNavigate();
  useEffect(()=>{
    setEssayList(
      {
        title:"",
        essayDetails:[
          {question:"",answer:""},
          {question:"",answer:""},
          {question:"",answer:""},
        ]
      }
    )
    setCurrentPage(0);
  },[]);
  
  const goToPage = (page) => {
    console.log(essayList.essayDetails[page]);
    if (page >= 0 && page < essayList.essayDetails.length) {
      setCurrentPage(page);
    }
  };
  const handleTitle = (e) => {
    setEssayList((prevData)=>({
      ...prevData,
      title:e.target.value

    }));
  };

    const handleQuestion = (e) => {
      setEssayList(prevState => ({
        ...prevState,
        essayDetails: prevState.essayDetails.map((detail, index) => 
          index === currentPage 
            ? {...detail, question: e.target.value}
            : detail
        )
      }));
    };

    const handleAnswer = (e) => {
      setEssayList(prevState => ({
        ...prevState,
        essayDetails: prevState.essayDetails.map((detail, index) => 
          index === currentPage 
            ? {...detail, answer: e.target.value}
            : detail
        )
      }));
    };
  const onclickSave =async()=>{
      await axios.post(`/api/mypage/essays`,essayList)
      .then((response)=>{
        console.log(response);
        alert("자기소개서 저장 완료");
        navigate("/mypage/myessay");
      }).catch((error)=>{
        console.log(error);
      })
  }
  
  const addEssay = () => {
    setEssayList((prevData)=>({
      ...prevData,
      essayDetails:[
        ...prevData.essayDetails,
        {question:"",answer:""},
      ]
      
    }))};

  return (
    <div>
      <S.page>
        <Sidebar menu="essay" />
        <S.wrap>
          <h2>자기소개서 작성하기</h2>
          <hr />
          <div>

            {essayList.essayDetails
              .filter((essay,index) => index === currentPage)
              .map((essay,index) => (
                <S.EssayFormContainer key={index}>``
                  <div className="essayCreateBox">
              
            <S.btn theme="save" style={{ position: "relative", top: "5px", left: "1040px" }} onClick={onclickSave}>
               저장하기
            </S.btn> 
                    <S.essayCreateBox>
                      <S.esaayCategory>
                        <S.RoundedTextareaQues value={essayList.title} onChange={handleTitle} placeholder="자기소개서 주제"></S.RoundedTextareaQues>
                      </S.esaayCategory>

                      <S.esaayQuestion>
                        <S.RoundedTextareaQues value={essay.question} onChange={handleQuestion} placeholder="문항 질문을 입력하세요"></S.RoundedTextareaQues>
                      </S.esaayQuestion>

                      <S.essayAnswer>
                        <S.RoundedTextareaAns value={essay.answer} onChange={handleAnswer} placeholder="문항에 대한 자기소개서를 입력하세요"></S.RoundedTextareaAns>
                      </S.essayAnswer>

                      <S.btn theme="save" style={{ position: "relative", top: "-5px", left: "990px" }} onClick={addEssay}>문항 추가</S.btn>
                 
                 <S.PaginationContainer>
                       {[...Array(essayList.essayDetails.length).keys()].map((page,index) => (
                       <S.PaginationButton key={index} onClick={() => goToPage(index)}>
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