import PrepareSection from "../../components/studyroom/studyroombefore/PrepareSectionComponent";
import SelectInterviewee from "../../components/studyroom/studyroombefore/SelectIntervieweeComponent";
import * as S from "../../components/studyroom/StudyRoomStyledComponents";
import StudyRoomBefore from "../../components/studyroom/StudyRoomBeforeComponent";
import { useState, useEffect } from "react";
import StudyRoomInterviewer from "../../components/studyroom/StudyRoomInterviewerComponent";
import { useLocation } from "react-router";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useSelector } from "react-redux";
import { getClient } from "store/WebSocketStore";
import { initializeWebSocket, closeWebSocket } from "store/WebSocketStore";
import { useDispatch } from "react-redux";
import {
  hostJoinInterviewRoom,
  interviewSubscribe,
  joinInterviewRoom,
  userJoinRoom,
  userJoinRoomPub,
} from "store/InterviewWebSocketStore";
import StudyRoomInterviewee from "components/studyroom/StudyRoomIntervieweeComponent";
import { interviewActions } from "../../store/InterviewStore";

const StudyRoom = () => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const isStarted = useSelector((state) => state.interview.isStarted);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { user } = useSelector((state) => state.auth);
  const role = useSelector((state) => state.interview.myRole);

  const isHost = location.state?.isHost;

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
          answer:
            "빤쮸토끼4번답변이에요. wrap 확인용으로 이것저것 길게 적어보기 알아서 잘 넘어가나 확인 해보게... 아무마ㅏㄴㄴㅇㄹㄴㅇㄹㄴ얼니ㅏ어라니어라니어리ㅏㄴ얼니ㅏㅇ러니ㅏ러니아러니아러니아러니아러니아러니아런이ㅏ러닝란디러내ㅑㄷㄹ나ㅣ츠니ㅏ읖나ㅣㄷㅎ러나ㅣㅇ런이ㅇㄴ로어ㅏㄴ로이ㅏ런아ㅣㄹㄴ어ㅏㄹㄴ아ㅓ가나다라마다ㅣ너ㅣ아런이ㅏ러니아ㅓㄹ니다ㅗㄹ냐ㅣㄷ러니ㅏㅇ러니ㅏㅇ러니ㅏ얼니ㅏ얼니ㅏㅇ러니댜ㅓㄹ냐얼니ㅏㅇ러니ㅏㄷ러니다러니아러니아러니아러니다러니다러니ㅏㅇ렁니ㅏㅇ러니덜댜널재ㅑ더래자어리나얼니ㅏㅇ러니ㅏ어라ㅣㅏ러니아ㅓㄹㄴ아ㅣ러닝러니아러니아런이라ㅓㄴ이ㅏ런이ㅏ런이라너다런디ㅏ런아ㅣ런이ㅏ츰니ㅏ얼니ㅑ덜니ㅏㄷ루니ㅏㅇ루니ㅏㅇ러니ㅏㅇ러니댜러니아룬아ㅣㄹㄴㅁㅇ리ㅏㅁㄴㅇ라ㅓㅣㄴㅇ러ㅣ낟ㄹㄴ다ㅣ러나ㅣㄷ러니다러닏아ㅓㄴ디라",
        },
      ],
    },
  ];
  const qlist = peopleList.map((person) => ({
    name: person.name,
    questions: [],
  }));

  const APPLICATION_SERVER_URL =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:8000/";
  const [questionList, setQuestionList] = useState(qlist);
  const [OV, setOV] = useState(null);

  const [OVForScreenSharing, setOVForScreenSharing] = useState();
  const [sessionForScreenSharing, setSessionForScreenSharing] = useState();

  const [session, setSession] = useState(null);

  const [mySession, setMySession] = useState("");
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);

  const [initScreenData, setInitScreenData] = useState({
    mySessionId: mySession + "_screen",
    myScreenName: user.nickname + "님의 화면",
  });

  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [isSpeakList, setIsSpeakList] = useState([]);
  const [publisherForScreenSharing, setPublisherForScreenSharing] =
    useState(null);

  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const [doScreenSharing, setDoScreenSharing] = useState(false);
  const [doStartScreenSharing, setDoStartScreenSharing] = useState(false);
  const [doStopScreenSharing, setDoStopScreenSharing] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [doPauseScreenSharing, setDoPauseScreenSharing] = useState(false);
  const [checkMyScreen, setCheckMyScreen] = useState(false);
  const [destroyedStream, setDestroyedStream] = useState(null);

  const [choiceScreen, setChoiceScreen] = useState("");
  const [openScreenModal, setOpenScreenModal] = useState(false);
  const [isHideCam, setIsHideCam] = useState(false);

  useEffect(() => {
    const storedList = localStorage.getItem("questionList");
    if (storedList) {
      setQuestionList(JSON.parse(storedList));
    }
  }, []);
  const { pathname } = useLocation();

  useEffect(() => {
    setMySession(pathname.substring(11));
    joinSession();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);
    return () => {
      leaveSession();
      window.removeEventListener("beforeunload", leaveSession);
    };
  }, [session]);

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

  const deleteIsSperker = (connectionId) => {
    let prevIsSpeakList = isSpeakList;
    let index = prevIsSpeakList.indexOf(connectionId, 0);
    if (index > -1) {
      prevIsSpeakList.splice(index, 1);
      setIsSpeakList([...prevIsSpeakList]);
    }
  };

  const joinSession = () => {
    const newOpenVidu = new OpenVidu();
    newOpenVidu.enableProdMode();
    const newSession = newOpenVidu.initSession();

    setOV(newOpenVidu);
    setSession(newSession);

    const connection = () => {
      newSession.on("streamCreated", (event) => {
        const newSubscriber = newSession.subscribe(
          event.stream,
          JSON.parse(event.stream.connection.data).clientData
        );
        if (newSubscriber.stream.typeOfVideo === "CUSTOM") {
          const newSubscribers = subscribers;
          newSubscribers.push(newSubscriber);

          setSubscribers([...newSubscribers]);
        } else {
          // 비디오인 경우 화면 공유 스트림
          setMainStreamManager(newSubscriber);
          setIsScreenSharing(true);
          setDoPauseScreenSharing(true);
        }
      });

      newSession.on("streamDestroyed", (event) => {
        if (event.stream.typeOfVideo === "CUSTOM") {
          deleteSubscriber(event.stream.streamManager);
        } else {
          setDestroyedStream(event.stream.streamManager);
          setCheckMyScreen(true);
        }
      });

      newSession.on("publisherStartSpeaking", (event) => {
        const newIsSpeakList = isSpeakList;
        newIsSpeakList.push(event.connection.connectionId);
        setIsSpeakList([...newIsSpeakList]);
      });

      newSession.on("publisherStopSpeaking", (event) => {
        deleteIsSperker(event.connection.connectionId);
      });

      // newSession.on('sessionDisconnected', (event) => {
      //   console.log(event);
      // });

      newSession.on("exception", (exception) => {
        console.warn(exception);
      });

      getToken().then((token) => {
        newSession
          .connect(token, { clientData: user.nickname })
          .then(async () => {
            await newOpenVidu
              .getUserMedia({
                audioSource: false,
                videoSource: undefined,
                resolution: "330x180",
                frameRate: 10,
              })
              .then((mediaStream) => {
                var videoTrack = mediaStream.getVideoTracks()[0];

                var newPublisher = newOpenVidu.initPublisher(user.nickname, {
                  audioSource: undefined,
                  videoSource: videoTrack,
                  publishAudio: isAudioOn,
                  publishVideo: isVideoOn,
                  // resolution: '1280x720',
                  // frameRate: 10,
                  insertMode: "APPEND",
                  mirror: true,
                });

                newPublisher.once("accessAllowed", () => {
                  newSession.publish(newPublisher);
                  setPublisher(newPublisher);
                  console.log(newPublisher);
                });
              })
              .catch((error) => {
                console.log(error);
              });
          });
      });
    };
    connection();
  };

  const leaveSession = () => {
    if (!session) return;
    session?.disconnect();

    // Empty all properties...
    setPublisher(null);
    setSubscribers([]);
  };

  useEffect(() => {
    localStorage.setItem("questionList", JSON.stringify(questionList));
  }, [questionList]);

  const deleteSubscriber = (streamManger) => {
    let subs = subscribers;
    let index = subs.indexOf(streamManger, 0);
    if (index > -1) {
      subs.splice(index, 1);
      setSubscribers(subs);
    }
  };

  const getToken = async () => {
    return createSession(mySession).then((sId) => createToken(sId));
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions`,
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  };

  // 면접방 웹 소켓 연결
  useEffect(() => {
    async function initialize() {
      // 내부 컴포넌트가 먼저 동작하지 않도록 설정
      // 여기서 여러 가지 초기화 작업 수행
      // 예: 웹소켓 연결, 데이터 가져오기 등
      const interviewRoomId = location.pathname.replace("/studyroom/", "");

      // 웹소켓 연결
      dispatch(initializeWebSocket(accessToken))
        // 일반 유저일 때만 pub함, 방장은 pub 불필요
        .then(() => {
          if (isHost === false) {
            dispatch(
              userJoinRoomPub({
                interviewRoomId,
                userJoinData: user,
              })
            );
            console.log("일반 유저가 pub ", interviewRoomId, user);
          }
        })

        // 구독
        .then(() => {
          const client = getClient();
          dispatch(interviewSubscribe({ client, interviewRoomId }));
          console.log("구독 성공");
        })

        // 조인 이후, DB 에서 방 데이터 가져와서 curretRoom 에 넣기.
        .then(() => {
          // 일반 유저는 조인하면서 방에 자신을 넣는데,
          // 방장은 방 만들때 이미 넣었으므로 그 작업이 불필요, 그냥 방 가져오면 됨
          if (isHost === false) {
            dispatch(joinInterviewRoom(interviewRoomId));
            console.log("일반 유저 입장 - DB 데이터 가져오기");
          }
        })

        // 내부 컴포넌트 동작되게 설정
        .then(() => {
          setInitialized(true);
        })
        .catch(() => {
          console.log("웹소켓 연결 --> 구독이.. 실패!");
        });
    }
    initialize();
    return () => {
      dispatch(closeWebSocket());
    };
  }, []);

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
      {initialized ? (
        !isStarted ? (
          <StudyRoomBefore
            streamManager={publisher}
            questionList={questionList}
            setQuestionList={setQuestionList}
            peopleList={peopleList}
            leaveSession={leaveSession}
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
        )
      ) : (
        <p>Loading...</p> // 이 부분은 로딩 표시로 대체할 수 있습니다.
      )}
    </div>
  );
};

export default StudyRoom;
