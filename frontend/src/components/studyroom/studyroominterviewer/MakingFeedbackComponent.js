import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "../StudyRoomStyledComponents";
import { interviewActions } from "store/InterviewStore";
import { addFeedback } from "store/InterviewWebSocketStore";
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';


const MakingFeedback = ({
    // targetQuestion,
    // feedbackList,
    // setFeedbackList,
    checkWho,
}) => {
    // const [newQuestion, setNewQuestion] = useState("");

    // 지금 컴포넌트 자체는 피드백 대상자가 정해져있음
    // 이미 checkWho까지 들고 온 상태니까
    // 우리가 들고다니는 전체 배열에서 이 사람에 대한 targetQuestion : 질문들 만! 리스트도 가져온 상태이고

    // 들어온 질문 수 만큼 input 배열 생성. 피드백도 그만큼 들어가야 하니까
    // const initialInputs = Array.from(
    //     { length: targetQuestion.length },
    //     () => ""
    // );
    // 들어온 질문 수 만큼 feedbacks 초기 배열도 생성하기. 질문과 피드백이 쌍으로 들어갈 배열
    // const initialFeedbacks = Array.from(
    //     { length: targetQuestion.length },
    //     () => ({ question: "", feedback: "" })
    // );
    // const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
    // const [inputValues, setInputValues] = useState(initialInputs);

    // const initFeedbackQuestions = (length) => {
    //     return Array.from({ length }, () => "");
    // };

    // useEffect(() => {
    //     // checkWho에 해당하는 객체를 찾기
    //     const targetObject = feedbackList.find(
    //         (item) => item.name === checkWho
    //     );

    //     // targetObject 있고, 해당 객체의 questions 배열이 비어있을 경우에만 초기화
    //     // 근데 어차피 뭐.......
    //     // if (targetObject && targetObject.questions.length === 0) {
    //     const initQuestions = initFeedbackQuestions(targetQuestion.length);
    //     const updatedFeedbackList = feedbackList.map((item) =>
    //         item.name === checkWho
    //             ? { ...item, questions: initQuestions }
    //             : item
    //     );
    //     setFeedbackList(updatedFeedbackList);
    //     // }
    // }, [checkWho, feedbackList, setFeedbackList, targetQuestion.length]);

    // 각 input 값이 변경될 때마다 인덱스에 따라서
    // 현재 inputValues의 배열에서 인덱스 찾아서 그 인덱스에 값 업데이트 하는거고
    // const handleFeedback = (e, index) => {
    //     const { value } = e.target;
    //     setInputValues((prevInputValues) => {
    //         return prevInputValues.map((inputValue, i) =>
    //             i === index ? value : inputValue
    //         );
    //     });
    // };

    // 그냥 모든 input 입력하고 난 다음에 피드백을 제출하게 하자..
    //
    // const submitFeedback = () => {
    // 이 입력된 값들을 저장할 전체피드백리스트의 해당 사람 이름으로 된 객체를 가져오자
    // const target = feedbackList.find((list) => list.name === checkWho);
    // 그럼 지금 inputValues배열들에는 feedbacks들이
    // targetQuestion 배열에는 질문들이 인덱스에 맞춰져서 들어가 있을 것이다
    // 들어가 있어야 한다...

    // 그럼 얘네들을 합쳐서 feedbackList에 저장하면 되겠네!

    // 그럼 저 합친걸 일단 feedbacks라고 저장하자
    // setFeedbacks((prevData) => {
    //     return prevData.map((item, index) => ({
    //         question: targetQuestion[index],
    //         feedback: inputValues[index],
    //     }));
    // });

    // console.log(feedbacks);
    // 그럼 이제 전체 feedbackList를 돌면서
    // 같은 이름의 객체를 만나면 위에서 만든 feedbacks로 업데이트해주자
    // setFeedbackList((prevData) => {
    //     return prevData.map((object) =>
    //         feedbackList.name === checkWho
    //             ? [{ name: checkWho }, feedbacks]
    //             : object
    //     );
    // });

    // setFeedbackList((prevData) => {
    //     return prevData.map((target) =>
    //         feedbackList.name === checkWho
    //             ? [{ name: checkWho }, feedbacks]
    //             : target
    //     );
    // });
    // };

    // useEffect(() => {
    //     const idx = feedbackList.findIndex((obj) => obj.name === checkWho);
    //     setTargetUserIdx(idx);
    //     setQLength(
    //         feedbackList[targetUserIdx]?.feedbacks?.map((item) => item.question)
    //             .length
    //     );
    // }, [feedbackList, checkWho]);
    // useEffect(() => {
    //     const idx = feedbackList.findIndex((obj) => obj.name === checkWho);
    //     setTargetUserIdx(idx);
    // }, [feedbackList, checkWho]);

    // useEffect(() => {
    //     if (targetUserIdx !== null) {
    //         setQLength(
    //             feedbackList[targetUserIdx]?.feedbacks?.map(
    //                 (item) => item.question
    //             ).length
    //         );
    //     }
    // }, [feedbackList, targetUserIdx]);
    // ----------------------------------------------------------------------
    const feedbackList = useSelector((state) => state.interviewWebSocket.feedbackList);
    const [targetUserIdx, setTargetUserIdx] = useState(null);
    const [qlength, setQLength] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentRoom} = useSelector((state)=>state.interviewWebSocket);
    useEffect(() => {
        const idx = feedbackList.findIndex((obj) => obj.nickname === checkWho);
        setTargetUserIdx(idx);
        // console.log(idx);
        if (idx !== null) {
            setQLength(
                feedbackList[idx]?.feedbacks?.map((item) => item.question)
                    .length
            );
        }
    }, [checkWho]);

    const initialInputs = Array.from({ length: qlength }, () => null);
    const initialFeedbacks = Array.from({ length: qlength }, () => ({
        question: "",
        feedback: "",
    }));

    const [inputValues, setInputValues] = useState(initialInputs);
    const [newfeedbacks, setNewFeedbacks] = useState(initialFeedbacks);

    const handleFeedback = (e, index) => {
        dispatch(addFeedback({value:e.target.value,index,targetUserIdx}))

        // console.log(qlength);
    };

    const submitFeedback = async () => {
        // const updatedMatchingObject = updateMatchingObject();
        // const combinedFeedbacks = feedbackList[targetUserIdx]?.feedbacks.map(
        //     (item, index) => ({
        //         question: item.question,
        //         feedback: inputValues[index],
        //     })
        // );
        if (window.confirm(`${checkWho}님에게 피드백을 등록할까요?`)) {
            // console.log(feedbackList[targetUserIdx]);
            let content = "";
            feedbackList[targetUserIdx].feedbacks.forEach((element,index) => {
                content+=`${index+1}. ${element.question}\n ${element.feedback}\n\n`
            });
            axios.post("api/mypage/feedbacks/save",{
                content:content,
                roomId:currentRoom.id,
                roomTitle:currentRoom.title,
                receiver:feedbackList[targetUserIdx].nickname
            }).then((response)=>{
                // console.log(response);
                alert("피드백 저장 완료");
            }).catch((error)=>{
                // console.log(error);
            })
            // const combinedFeedbacks = feedbackList[
            //     targetUserIdx
            // ]?.feedbacks.map((item, index) => ({
            //     question: item.question,
            //     feedback: inputValues[index], // prevInputValues를 사용
            // }));
            // console.log(combinedFeedbacks);
            // setNewFeedbacks(combinedFeedbacks);

            // const newfeedbackList = feedbackList.map((object) =>
            //     object.name === checkWho ? combinedFeedbacks : object
            // );

            // dispatch(interviewActions.updateFeedbacks(newfeedbackList));
        }
    };

    const test = () => {
        // console.log("test");
        // console.log(feedbackList);
    };
    // ----------------------------------------------------------------------

    return (
        <div>
            <S.questionWrap>
                <S.questionIntro>
                    {checkWho}님에게 피드백을 작성해주세요
                </S.questionIntro>
                {/* <S.questionSubmitWrap> */}
                {feedbackList[targetUserIdx]?.feedbacks
                    ?.map((item,index) => (
                        <S.feedbackEach>
                            <S.questionEach>
                                {index + 1}. {item.question}
                            </S.questionEach>
                            <S.feedbackInputWrap>
                                <S.feedbackInput
                                    value={item.feedback}
                                    onChange={(e) => handleFeedback(e, index)}
                                />
                            </S.feedbackInputWrap>
                        </S.feedbackEach>
                    ))
                    }
                <S.buttonWrap>
                    <S.feedbackButton onClick={submitFeedback}>
                        저장
                    </S.feedbackButton>
                </S.buttonWrap>
                {/* <button onClick={test}>Test전체피드백</button> */}
                {/* </S.questionSubmitWrap> */}
            </S.questionWrap>
        </div>
    );
};

export default MakingFeedback;
