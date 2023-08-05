import PrepareSection from "../../components/studyroom/studyroombefore/PrepareSectionComponent";
import SelectInterviewee from "../../components/studyroom/studyroombefore/SelectIntervieweeComponent";
import * as S from "../../components/studyroom/StudyRoomStyledComponents";
import StudyRoomBefore from "../../components/studyroom/StudyRoomBeforeComponent";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import StudyRoomInterviewer from "../../components/studyroom/StudyRoomInterviewerComponent";
import StudyRoomInterviewee from "components/studyroom/StudyRoomIntervieweeComponent";
import { interviewActions } from "../../store/InterviewStore";

const StudyRoom = () => {
    const dispatch = useDispatch();
    // const feedbackList = useSelector((state) => state.interview);
    const isStarted = useSelector((state) => state.interview.isStarted);
    const role = useSelector((state) => state.interview.myRole);

    // 참가자 더미데이터 (자신 제외)
    const peopleList = [
        {
            name: "최고심",
            rate: 3.4,
            email: "gosim@ssafy.com",
            essay: [
                { quest: "고심이1번질문이에요", answer: "고심이1번답변이에요" },
                { quest: "고심이2번질문이에요", answer: "고심이2번답변이에요" },
                { quest: "고심이3번질문이에요", answer: "고심이3번답변이에요" },
            ],
        },
        {
            name: "춘식이",
            rate: 4.3,
            email: "sick@ssafy.com",
            essay: [
                { quest: "춘식이1번질문이에요", answer: "춘식이1번답변이에요" },
                { quest: "춘식이2번질문이에요", answer: "춘식이2번답변이에요" },
            ],
        },
        {
            name: "빤쮸토끼",
            rate: 1.3,
            email: "rabbit@ssafy.com",
            essay: [
                {
                    quest: "빤쮸토끼1번질문이에요",
                    answer: "빤쮸토끼1번답변이에요",
                },
                {
                    quest: "빤쮸토끼2번질문이에요",
                    answer: "빤쮸토끼2번답변이에요",
                },
                {
                    quest: "빤쮸토끼3번질문이에요",
                    answer: "빤쮸토끼3번답변이에요",
                },
                {
                    quest: "빤쮸토끼4번질문이에요",
                    answer: "빤쮸토끼4번답변이에요. wrap 확인용으로 이것저것 길게 적어보기 알아서 잘 넘어가나 확인 해보게... 아무마ㅏㄴㄴㅇㄹㄴㅇㄹㄴ얼니ㅏ어라니어라니어리ㅏㄴ얼니ㅏㅇ러니ㅏ러니아러니아러니아러니아러니아러니아런이ㅏ러닝란디러내ㅑㄷㄹ나ㅣ츠니ㅏ읖나ㅣㄷㅎ러나ㅣㅇ런이ㅇㄴ로어ㅏㄴ로이ㅏ런아ㅣㄹㄴ어ㅏㄹㄴ아ㅓ가나다라마다ㅣ너ㅣ아런이ㅏ러니아ㅓㄹ니다ㅗㄹ냐ㅣㄷ러니ㅏㅇ러니ㅏㅇ러니ㅏ얼니ㅏ얼니ㅏㅇ러니댜ㅓㄹ냐얼니ㅏㅇ러니ㅏㄷ러니다러니아러니아러니아러니다러니다러니ㅏㅇ렁니ㅏㅇ러니덜댜널재ㅑ더래자어리나얼니ㅏㅇ러니ㅏ어라ㅣㅏ러니아ㅓㄹㄴ아ㅣ러닝러니아러니아런이라ㅓㄴ이ㅏ런이ㅏ런이라너다런디ㅏ런아ㅣ런이ㅏ츰니ㅏ얼니ㅑ덜니ㅏㄷ루니ㅏㅇ루니ㅏㅇ러니ㅏㅇ러니댜러니아룬아ㅣㄹㄴㅁㅇ리ㅏㅁㄴㅇ라ㅓㅣㄴㅇ러ㅣ낟ㄹㄴ다ㅣ러나ㅣㄷ러니다러닏아ㅓㄴ디라",
                },
            ],
        },
    ];

    // const [questionList, setQuestionList] = useState([]);

    const qlist = peopleList.map((person) => ({
        name: person.name,
        questions: [],
    }));
    // const fblist = peopleList.map((person) => ({
    //     name: person.name,
    //     feedbacks: [{ question: "", feedback: "" }],
    // }));

    const [questionList, setQuestionList] = useState(qlist);
    // const [feedbackList, setFeedbackList] = useState(fblist);

    useEffect(() => {
        const storedList = localStorage.getItem("questionList");
        if (storedList) {
            setQuestionList(JSON.parse(storedList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("questionList", JSON.stringify(questionList));
    }, [questionList]);

    useEffect(() => {
        // 더미데이터대로 일단 추가
        const updatedFeedbackList = [
            {
                name: "최고심",
                feedbacks: [{ question: [], feedback: [] }],
            },
            {
                name: "춘식이",
                feedbacks: [{ question: [], feedback: [] }],
            },
            {
                name: "빤쮸토끼",
                feedbacks: [{ question: [], feedback: [] }],
            },
        ];
        dispatch(interviewActions.updateFeedbacks(updatedFeedbackList));
    }, [dispatch]);

    return (
        <div>
            {/* {isStarted && role === "interviewer" && (
                <StudyRoomInterviewer
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    // feedbackList={feedbackList}
                    // setFeedbackList={setFeedbackList}
                    peopleList={peopleList}
                />
            )}
            {isStarted && role === "interviewee" && (
                <StudyRoomInterviewee peopleList={peopleList} />
            )}
            {!isStarted && (
                <StudyRoomBefore
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    peopleList={peopleList}
                />
            )} */}
            {!isStarted ? (
                <StudyRoomBefore
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    peopleList={peopleList}
                />
            ) : role === "interviewer" ? (
                <StudyRoomInterviewer
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    // feedbackList={feedbackList}
                    // setFeedbackList={setFeedbackList}
                    peopleList={peopleList}
                />
            ) : (
                <StudyRoomInterviewee
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    peopleList={peopleList}
                />
            )}
        </div>
    );
};

export default StudyRoom;
