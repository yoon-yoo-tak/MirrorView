import { useState } from "react";

import * as S from "./StudyRoomStyledComponents";

const SelectInterviewee = () => {
    const [interviewee, setInterviewee] = useState(true);

    // 더미데이터
    const intervieweeList = [
        { name: "최고심" },
        { name: "춘식이" },
        { name: "빤쮸토끼" },
    ];
    const interviewerList = [
        { name: "동글이" },
        { name: "수리" },
        { name: "빅또리" },
    ];

    const changeToInterviewee = () => {
        console.log("지금은 면접자입니다");
        setInterviewee(true);
    };
    const changeToInterviewer = () => {
        console.log("지금은 면접관입니다!!");
        setInterviewee(false);
    };

    return (
        <S.selectPage>
            <S.selectChild>
                <S.selectSectionTop>
                    <S.nowText now="interviewee">면접자</S.nowText>
                    <label htmlFor="interviewee">
                        <input
                            type="radio"
                            checked={interviewee === true}
                            name="interview"
                            onChange={changeToInterviewee}
                        />
                        {/* <S.changeButton>전환하기</S.changeButton> */}
                    </label>
                </S.selectSectionTop>

                <S.selectSectionList>
                    {intervieweeList.map((props, index) => (
                        <S.personList key={index}>{props.name}</S.personList>
                    ))}
                </S.selectSectionList>
            </S.selectChild>

            <hr />
            <S.selectChild>
                <S.selectSectionTop>
                    <S.nowText now="interviewer">면접관</S.nowText>
                    <label htmlFor="interviewer">
                        <input
                            type="radio"
                            checked={interviewee === false}
                            name="interview"
                            onChange={changeToInterviewer}
                        />
                    </label>
                </S.selectSectionTop>

                <S.selectSectionList>
                    {interviewerList.map((props, index) => (
                        <S.personList key={index}>{props.name}</S.personList>
                    ))}
                </S.selectSectionList>
            </S.selectChild>
        </S.selectPage>
    );
};

export default SelectInterviewee;
