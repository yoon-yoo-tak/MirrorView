import { useState } from "react";

import * as S from "../../StudyRoomStyledComponents";
import StudyProfileDetail from "./studypreparedetail/StudyProfileDetailComponent";
import StudyEssayDetail from "./studypreparedetail/StudyEssayDetailComponent";
import StudyQuestionDetail from "./studypreparedetail/StudyQuestionDetailComponent";

const StudyProfileAndEssay = (props) => {
    const { peopleList, questionList, setQuestionList } = props;

    const [tap, setTap] = useState("profile");
    const [checkProfile, setCheckProfile] = useState({
        name: "",
        rate: "",
        email: "",
    });
    const [checkEssay, setCheckEssay] = useState([]);
    const [checkWho, setCheckWho] = useState("");
    const [checkQuestions, setCheckQuestions] = useState([]);
    const [targetObject, setTargetObject] = useState({
        name: "",
        questions: [],
    });

    const handleProfileTap = () => {
        setTap("profile");
    };

    const handleEssayTap = () => {
        setTap("essay");
    };

    const handleQuestionTap = () => {
        setTap("question");
    };

    const handleCheckWho = (name) => {
        const target = peopleList.find((person) => person.name === name);

        setCheckProfile({
            name: target.name,
            rate: target.rate,
            email: target.email,
        });
        setCheckEssay(target.essay);
        setCheckWho(target.name);
        setCheckQuestions(
            questionList.find((person) => person.name === target.name)
        );
        setTargetObject(questionList.find((list) => list.name === target.name));
        console.log(questionList);
    };

    // const addQuestionToProfile = (question) => {
    //     setQuestionList((prevList) =>
    //         prevList.map((item) =>
    //             item.name === checkWho
    //                 ? { ...item, questions: [...item.questions, question] }
    //                 : item
    //         )
    //     );
    // };
    // const updateQuestionInProfile = (checkWho, updatedQuestions) => {
    //     setQuestionList((prevList) =>
    //         prevList.map((item) =>
    //             item.name === checkWho
    //                 ? { ...item, questions: updatedQuestions }
    //                 : item
    //         )
    //     );
    //     setTargetObject(questionList.find((list) => list.name === checkWho));
    //     localStorage.setItem("questionList", JSON.stringify(questionList));
    // };

    return (
        <div>
            <S.profileAndEssayWrap>
                <S.peopleTapWrap>
                    <S.peopleTap>
                        <S.peopleTitle>참여자</S.peopleTitle>
                        <hr />
                        <div>
                            {peopleList.map((people, index) => (
                                <S.peopleName
                                    onClick={() => handleCheckWho(people.name)}
                                >
                                    {people.name}
                                </S.peopleName>
                            ))}
                        </div>
                    </S.peopleTap>
                </S.peopleTapWrap>
                <S.contentTapWrap>
                    <S.contentTapList>
                        <S.contentTap onClick={handleProfileTap}>
                            프로필
                        </S.contentTap>
                        <S.contentTap onClick={handleEssayTap}>
                            자기소개서
                        </S.contentTap>
                        <S.contentTap onClick={handleQuestionTap}>
                            질문리스트
                        </S.contentTap>
                    </S.contentTapList>
                    <S.contentDetail>
                        {checkEssay.length === 0 ? (
                            <S.profileContent>
                                참여자를 클릭해 정보를 확인하세요!
                            </S.profileContent>
                        ) : tap === "profile" ? (
                            <StudyProfileDetail
                                targetObject={targetObject}
                                setTargetObject={setTargetObject}
                                profile={checkProfile}
                                questionList={questionList}
                                setQuestionList={setQuestionList}
                                // addQuestionToProfile={addQuestionToProfile}
                            />
                        ) : tap === "essay" ? (
                            <StudyEssayDetail
                                essay={checkEssay}
                                onAir={false}
                            />
                        ) : (
                            tap === "question" && (
                                <StudyQuestionDetail
                                    checkWho={checkWho}
                                    targetObject={targetObject}
                                    setTargetObject={setTargetObject}
                                    // updateQuestionInProfile={
                                    //     updateQuestionInProfile
                                    // }
                                />
                            )
                        )}
                    </S.contentDetail>
                </S.contentTapWrap>
            </S.profileAndEssayWrap>
        </div>
    );
};

export default StudyProfileAndEssay;
