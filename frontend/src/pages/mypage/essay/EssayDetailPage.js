import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import classes from "./EssayDetail.module.scss";
import Sidebar from "../MypageSidebarPage";

import * as S from "../../../components/mypage/MypageStyledComponents";
import example from "./example";
import axios from "axios";
import essayData from "./essayData";

const EssayDetail = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { pathname, state } = useLocation();
    const [essayList, setEssayList] = useState({ title: "", essayDetails: [] });
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        const id = pathname.substring(20);
        axios
            .get(`/api/mypage/essays/${id}`)
            .then(({ data }) => {
                console.log(data);
                setEssayList({
                    id,
                    title: state,
                    essayDetails: data.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });
        setCurrentPage(0);
    }, []);

    // const essayUpdate = (e) => {
    //     e.preventDefault();
    //     navigate("essaydetail/:id/update");
    // };

    const goToPage = (page) => {
        if (page >= 0 && page <= essayList.essayDetails.length) {
            setCurrentPage(page);
        }
    };

    const handleTitle = (e) => {
        setEssayList((prevData) => ({
            ...prevData,
            title: e.target.value,
        }));
    };

    const handleQuestion = (e) => {
        setEssayList((prevState) => ({
            ...prevState,
            essayDetails: prevState.essayDetails.map((detail, index) =>
                index === currentPage
                    ? { ...detail, question: e.target.value }
                    : detail
            ),
        }));
    };
    const handleAnswer = (e) => {
        setEssayList((prevState) => ({
            ...prevState,
            essayDetails: prevState.essayDetails.map((detail, index) =>
                index === currentPage
                    ? { ...detail, answer: e.target.value }
                    : detail
            ),
        }));
    };

    const onclickSave = async () => {
        console.log(essayList);
        await axios
            .put(`/api/mypage/essays`, essayList)
            .then((response) => {
                console.log(response);
                alert("자기소개서 수정 완료");
                //   navigate("/mypage/myessay");
            })
            .catch((error) => {
                console.log(error);
            });
        // navigate("/mypage/myessay")
    };

    const addEssay = () => {
        setEssayList((prevData) => ({
            ...prevData,
            essayDetails: [
                ...prevData.essayDetails,
                { question: "", answer: "" },
            ],
        }));
    };

    const deleteEssay = () => {
        // console.log(currentPage);
        const updatedEssayDetails = essayList.essayDetails.filter(
            (_, index) => index !== currentPage
        );
        if (currentPage != 0) {
            setCurrentPage(currentPage - 1);
        }
        if (essayList.essayDetails.length == 1) {
            alert("삭제 안됨");
            return;
        }
        setEssayList({ ...essayList, essayDetails: updatedEssayDetails });
    };

    return (
        <div>
            <S.page>
                <Sidebar menu="essay" />
                <S.wrap>
                    <h2>자기소개서 상세보기</h2>
                    <hr />
                    <div>
                        {essayList.essayDetails
                            .filter((essay, index) => index === currentPage)
                            .map((essay, index) => (
                                <S.EssayFormContainer key={index}>
                                    <div className="essayCreateBox">
                                        {/* <S.btn theme="save" style={{ position: "relative", top: "5px", left: "1040px" }} onClick={onclickSave}>
           저장하기
        </S.btn>  */}
                                        <S.createContainer>
                                            <S.esaayCategory>
                                                <S.RoundedTextareaQues
                                                    value={essayList.title}
                                                    onChange={handleTitle}
                                                    type="title"
                                                    placeholder="자기소개서의 이름을 입력해주세요"
                                                ></S.RoundedTextareaQues>
                                            </S.esaayCategory>
                                            <S.saveBtn onClick={onclickSave} />
                                        </S.createContainer>
                                        <S.essayCreateBox>
                                            {/* <S.esaayCategory>
                                            <S.RoundedTextareaQues
                                                value={essayList.title}
                                                onChange={handleTitle}
                                                placeholder="자기소개서의 이름을 입력해주세요"
                                            ></S.RoundedTextareaQues>
                                        </S.esaayCategory> */}
                                            <S.currentPageInfo>
                                                {currentPage + 1}번 문항
                                            </S.currentPageInfo>

                                            <S.esaayQuestion>
                                                <S.RoundedTextareaQues
                                                    value={essay.question}
                                                    onChange={handleQuestion}
                                                    placeholder="질문을 입력하세요"
                                                ></S.RoundedTextareaQues>
                                            </S.esaayQuestion>

                                            <S.essayAnswer>
                                                <S.RoundedTextareaAns
                                                    value={essay.answer}
                                                    onChange={handleAnswer}
                                                    placeholder="답변을 입력하세요"
                                                ></S.RoundedTextareaAns>
                                            </S.essayAnswer>

                                            <S.essayFooter>
                                                <S.PaginationContainer>
                                                    {[
                                                        ...Array(
                                                            essayList
                                                                .essayDetails
                                                                .length
                                                        ).keys(),
                                                    ].map((page, index) => (
                                                        <S.PaginationButton
                                                            key={index}
                                                            onClick={() =>
                                                                goToPage(index)
                                                            }
                                                        >
                                                            <S.CircleNumber>
                                                                {page + 1}
                                                            </S.CircleNumber>
                                                        </S.PaginationButton>
                                                    ))}
                                                    {/* <S.btn
                                                theme="save"
                                                style={{
                                                    position: "absolute",
                                                    left: "880px",
                                                }}
                                                onClick={deleteEssay}
                                            >
                                                문항 삭제
                                            </S.btn>
                                            <S.btn
                                                theme="save"
                                                style={{
                                                    position: "absolute",
                                                    left: "980px",
                                                }}
                                                onClick={addEssay}
                                            >
                                                문항 추가
                                            </S.btn> */}
                                                </S.PaginationContainer>
                                                <S.btnContainer>
                                                    <S.addBtn
                                                        onClick={addEssay}
                                                    />
                                                    <S.minusBtn
                                                        onClick={deleteEssay}
                                                    />
                                                </S.btnContainer>
                                            </S.essayFooter>
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

export default EssayDetail;
