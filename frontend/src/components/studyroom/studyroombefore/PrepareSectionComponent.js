import { useState } from "react";

import * as S from "../StudyRoomStyledComponents";
// import PrepareTap from "./PrepareTapComponent";
import StudyChatting from "./preparesection/StudyChattingComponent";
import StudyMyEssay from "./preparesection/StudyMyEssayCheckComponent";
import StudyProfileAndEssay from "./preparesection/StudyProfileAndEssayComponent";
import StudyRating from "../starrating/StudyRatingComponent";
// import StudyQustionList from "./preparesection/StudyQuestionListComponent";

const PrepareSection = (props) => {
    const [section, setSection] = useState("info");
    const { peopleList, questionList, setQuestionList } = props;

    const handleInfo = () => {
        setSection("info");
    };

    // const handleQuest = () => {
    //     setSection("quest");
    // };

    const handleMyInfo = () => {
        setSection("myInfo");
    };

    const handleChat = () => {
        setSection("chat");
    };

    const [modalStates, setModalStates] = useState(false);

    const handleExit = () => {
        setModalStates(true);
    };

    return (
        <S.sectionPage>
            <S.sectionWrap>
                {section === "info" && (
                    <StudyProfileAndEssay
                        questionList={questionList}
                        setQuestionList={setQuestionList}
                        peopleList={peopleList}
                    />
                )}
                {/* {section === "quest" && (
                    <StudyQustionList
                        questionList={questionList}
                        setQuestionList={setQuestionList}
                    />
                )} */}
                {section === "myInfo" && <StudyMyEssay />}
                {section === "chat" && <StudyChatting />}
            </S.sectionWrap>
            <S.sectionSelectTaps>
                <div>
                    <S.sectionSelectTap onClick={handleInfo} menu="info">
                        INFO
                    </S.sectionSelectTap>
                    {/* <S.sectionSelectTap onClick={handleQuest} menu="quest">
                        Q.
                    </S.sectionSelectTap> */}
                    <S.sectionSelectTap onClick={handleMyInfo} menu="myInfo">
                        MY
                    </S.sectionSelectTap>
                    <S.sectionSelectTap onClick={handleChat} menu="chat">
                        CHAT
                    </S.sectionSelectTap>
                </div>
                <S.exitRoom onClick={handleExit}>나가기</S.exitRoom>
                {modalStates && <StudyRating peopleList={peopleList} />}
            </S.sectionSelectTaps>
        </S.sectionPage>
    );
};

export default PrepareSection;
