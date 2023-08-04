import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import {useSelector} from "react-redux"
import * as S from "../StudyRoomStyledComponents";

const SelectInterviewee = (props) => {
    const [interviewee, setInterviewee] = useState(true);
    const members = useSelector((state)=>state.interview.currentRoom.members);
    const nickname = useSelector((state) => state.auth.nickname);
    useEffect(()=>{
        console.log(members);

        const interviewee = [];
        const interviewer = [];
        members.forEach(member => {
            if (member.role ==="interviewee") {
                if(member.nickname == nickname){
                    setInterviewee(true);
                }   
                interviewee.push({name:member.nickname});
            } else {
                if(member.nickname == nickname){
                    setInterviewee(false);
                }
                interviewer.push({name:member.nickname});
            }
                 
        });
        setIntervieweeList(interviewee);
        setInterviewerList(interviewer);
    },[members]);
    // 더미데이터
    const [intervieweeList, setIntervieweeList] = useState([
        // 입장 시 유저의 기본값은 면접자로 설정
        { name: `${props.username}` },
        { name: "최고심" },
        { name: "춘식이" },
        { name: "빤쮸토끼" },
    ]);
    const [interviewerList, setInterviewerList] = useState([
        { name: "동글이" },
        { name: "수리" },
        { name: "빅또리" },
    ]);

    const changeToInterviewee = () => {
        if (!interviewee) {
            // console.log("나는 면접자야");
            setInterviewee(true);
            setInterviewerList((prevList) =>
                prevList.filter((item) => item.name !== props.username)
            );
            setIntervieweeList((prevList) => [
                { name: props.username },
                ...prevList,
            ]);
        } else return;
    };

    const changeToInterviewer = () => {
        if (interviewee) {
            // console.log("나는 면접관이야");
            setInterviewee(false);
            setIntervieweeList((prevList) =>
                prevList.filter((item) => item.name !== props.username)
            );
            setInterviewerList((prevList) => [
                { name: props.username },
                ...prevList,
            ]);
        } else return;
    };

    return (
        <S.selectPage>
            <S.selectChild now="wee">
                <S.selectSectionTop>
                    <S.nowText now="interviewee">면접자</S.nowText>
                    <label htmlFor="interviewee">
                        {!interviewee && (
                            <S.changeButtonActive onClick={changeToInterviewee}>
                                전환하기
                            </S.changeButtonActive>
                        )}
                        {interviewee && (
                            <S.changeButtonGray onClick={changeToInterviewee}>
                                전환하기
                            </S.changeButtonGray>
                        )}
                        <S.inputHidden
                            type="radio"
                            checked={interviewee === true}
                            name="interview"
                            onChange={() => {}}
                        />
                    </label>
                </S.selectSectionTop>

                <S.selectSectionList>
                    {intervieweeList.map((items, index) => (
                        <S.personList
                            checkname={
                                items.name === props.username ? "true" : ""
                            }
                            key={index}
                        >
                            {items.name}
                        </S.personList>
                    ))}
                </S.selectSectionList>
            </S.selectChild>

            <S.selectChild>
                <S.selectSectionTop>
                    <S.nowText now="interviewer">면접관</S.nowText>
                    <label htmlFor="interviewer">
                        {interviewee && (
                            <S.changeButtonActive onClick={changeToInterviewer}>
                                전환하기
                            </S.changeButtonActive>
                        )}
                        {!interviewee && (
                            <S.changeButtonGray onClick={changeToInterviewer}>
                                전환하기
                            </S.changeButtonGray>
                        )}
                        <S.inputHidden
                            type="radio"
                            checked={interviewee === false}
                            name="interview"
                            onChange={() => {}}
                        />
                    </label>
                </S.selectSectionTop>

                <S.selectSectionList>
                    {interviewerList.map((items, index) => (
                        <S.personList
                            checkname={
                                items.name === props.username ? "true" : ""
                            }
                            key={index}
                        >
                            {items.name}
                        </S.personList>
                    ))}
                </S.selectSectionList>
            </S.selectChild>
        </S.selectPage>
    );
};

export default SelectInterviewee;
