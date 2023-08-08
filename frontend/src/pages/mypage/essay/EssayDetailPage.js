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
    const { user, accessToken } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { pathname, state } = useLocation();
    const [essay, setEssay] = useState([]);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    useEffect(() => {
        console.log(pathname);
        const id = pathname.substring(20);
        axios
            .get(`/api/mypage/essays/${id}`)
            .then(({ data }) => {
                setEssay(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // const essayUpdate = (e) => {
    //     e.preventDefault();
    //     navigate("essaydetail/:id/update");
    // };

    const itemsPerPage = 1; // 1개씩 보여주도록 변경
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = essayData.length;

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleCompanyChange = (event) => {
        const newCompanyValue = event.target.value;
        setEssay((prevEssay) => ({
            ...prevEssay,
            company: newCompanyValue,
        }));
    };

    const handleTitleChange = (event) => {
        const newTitleValue = event.target.value;
        setEssay((prevEssay) => ({
            ...prevEssay,
            title: newTitleValue,
        }));
    };

    const handleContentChange = (event) => {
        const newContentValue = event.target.value;
        setEssay((prevEssay) => ({
            ...prevEssay,
            content: newContentValue,
        }));
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
                                        <S.btn
                                            theme="save"
                                            style={{
                                                position: "relative",
                                                top: "5px",
                                                left: "1040px",
                                            }}
                                        >
                                            저장하기
                                        </S.btn>
                                        <S.essayCreateBox>
                                            <S.esaayCategory>
                                                <S.RoundedTextareaQues
                                                    defaultValue={essay.company}
                                                    onChange={(event) =>
                                                        handleCompanyChange(
                                                            event
                                                        )
                                                    }
                                                ></S.RoundedTextareaQues>
                                            </S.esaayCategory>

                                            <S.esaayQuestion>
                                                <S.RoundedTextareaQues
                                                    placeholder={essay.title}
                                                    defaultValue={essay.title}
                                                    onChange={(event) =>
                                                        handleTitleChange(event)
                                                    }
                                                ></S.RoundedTextareaQues>
                                            </S.esaayQuestion>

                                            <S.essayAnswer>
                                                <S.RoundedTextareaAns
                                                    placeholder={essay.content}
                                                    defaultValue={essay.content}
                                                    onChange={(event) =>
                                                        handleContentChange(
                                                            event
                                                        )
                                                    }
                                                ></S.RoundedTextareaAns>
                                            </S.essayAnswer>

                                            <S.btn
                                                theme="save"
                                                style={{
                                                    position: "relative",
                                                    top: "-5px",
                                                    left: "990px",
                                                }}
                                            >
                                                문항 추가
                                            </S.btn>

                                            <S.PaginationContainer>
                                                {[
                                                    ...Array(totalPages).keys(),
                                                ].map((page) => (
                                                    <S.PaginationButton
                                                        key={page + 1}
                                                        onClick={() =>
                                                            goToPage(page + 1)
                                                        }
                                                    >
                                                        <S.CircleNumber>
                                                            {page + 1}
                                                        </S.CircleNumber>
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

export default EssayDetail;
