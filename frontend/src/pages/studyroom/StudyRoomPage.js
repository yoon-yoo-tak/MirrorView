import StudyRoomBefore from "../../components/studyroom/StudyRoomBeforeComponent";
import StudyRoomInterviewer from "../../components/studyroom/StudyRoomInterviewerComponent";
import StudyRoomInterviewee from "components/studyroom/StudyRoomIntervieweeComponent";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
    clearCurrentRoom,
    hostJoinInterviewRoom,
    interviewSubscribe,
    joinInterviewRoom,
    setRedirect,
    userJoinRoom,
    userJoinRoomPub,
} from "store/InterviewWebSocketStore";
import { WebSocketContext } from "WebSocketContext";

import { interviewActions } from "../../store/InterviewStore";
const StudyRoom = () => {
    const { client } = useContext(WebSocketContext);
    const [initialized, setInitialized] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const isStarted = useSelector(
        (state) => state.interviewWebSocket.currentRoom.started
    );
    const accessToken = useSelector((state) => state.auth.accessToken);
    const { user } = useSelector((state) => state.auth);
    const role = useSelector((state) => state.interview.myRole);
    const currentRoom = useSelector((state) => state.currentRoom);
    const { redirect } = useSelector((state) => state.interviewWebSocket);
    const isHost = location.state?.isHost;
    // 방장을 다시 찾아줘야함

    useEffect(() => {
        if (redirect) {
            return;
        }
        // dispatch(interviewActions.updateStarted(false));s
        console.log(isStarted);
        return () => {};
    }, [isStarted]);
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

    const navigate = useNavigate();
    useEffect(() => {
        if (redirect) {
            return;
        }
        const storedList = localStorage.getItem("questionList");
        if (storedList) {
            setQuestionList(JSON.parse(storedList));
        }
    }, []);
    const { pathname } = useLocation();

    useEffect(() => {
        if (redirect) {
            return;
        }
        setMySession(pathname.substring(11));
        joinSession();
    }, []);

    const preventClose = (e) => {
        e.preventDefault();
        dispatch(setRedirect(true));
        // e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
    };

    // 브라우저에 렌더링 시 한 번만 실행하는 코드
    useEffect(() => {
        if (redirect) {
            return;
        }
        (() => {
            window.addEventListener("beforeunload", preventClose);
        })();

        return () => {
            window.removeEventListener("beforeunload", preventClose);
        };
    }, []);
    useEffect(() => {
        if (redirect) {
            return;
        }
        window.addEventListener("beforeunload", leaveSession);
        return () => {
            leaveSession();
            window.removeEventListener("beforeunload", leaveSession);
        };
    }, [session]);

    useEffect(() => {
        if (redirect) {
            return;
        }
        window.addEventListener("beforeunload", leaveSessionForScreenSharing);
        return () => {
            leaveSessionForScreenSharing();
            window.removeEventListener(
                "beforeunload",
                leaveSessionForScreenSharing
            );
        };
    }, [sessionForScreenSharing]);

    useEffect(() => {
        if (redirect) {
            return;
        }
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
                                resolution: "1280x720",
                                frameRate: 10,
                            })
                            .then((mediaStream) => {
                                var videoTrack =
                                    mediaStream.getVideoTracks()[0];

                                var newPublisher = newOpenVidu.initPublisher(
                                    user.nickname,
                                    {
                                        audioSource: undefined,
                                        videoSource: videoTrack,
                                        publishAudio: isAudioOn,
                                        publishVideo: isVideoOn,
                                        // resolution: '1280x720',
                                        // frameRate: 10,
                                        insertMode: "APPEND",
                                        mirror: true,
                                    }
                                );

                                newPublisher.once("accessAllowed", () => {
                                    newSession.publish(newPublisher);
                                    setPublisher(newPublisher);
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

    useEffect(() => {
        if (redirect) {
            return;
        }
        if (doStartScreenSharing) {
            startScreenShare();
        }
    }, [doStartScreenSharing]);

    useEffect(() => {
        if (redirect) {
            return;
        }
        if (doStartScreenSharing && choiceScreen) {
            startScreenShare();
        }
    }, [choiceScreen]);

    useEffect(() => {
        if (redirect) {
            return;
        }
        if (doStopScreenSharing) {
            stopScreenShare();
            setIsHideCam(false);
        }
    }, [doStopScreenSharing]);

    useEffect(() => {
        if (redirect) {
            return;
        }
        if (doPauseScreenSharing) {
            if (
                doScreenSharing &&
                mainStreamManager?.stream.connection.connectionId !==
                    publisherForScreenSharing?.stream.connection.connectionId
            ) {
                stopScreenShare();
            }
            setDoPauseScreenSharing(false);
        }
    }, [doPauseScreenSharing]);

    useEffect(() => {
        if (redirect) {
            return;
        }
        if (checkMyScreen) {
            if (
                destroyedStream?.stream.connection.connectionId ===
                mainStreamManager?.stream.connection.connectionId
            ) {
                setIsScreenSharing(false);
                setMainStreamManager(null);
                setIsHideCam(false);
            }
            setDestroyedStream(null);
            setCheckMyScreen(false);
        }
    }, [checkMyScreen]);

    const deleteSubscriber = (streamManger) => {
        let subs = subscribers;
        let index = subs.indexOf(streamManger, 0);
        if (index > -1) {
            subs.splice(index, 1);
            setSubscribers([...subs]);
        }
    };

    const deleteIsSperker = (connectionId) => {
        let prevIsSpeakList = isSpeakList;
        let index = prevIsSpeakList.indexOf(connectionId, 0);
        if (index > -1) {
            prevIsSpeakList.splice(index, 1);
            setIsSpeakList([...prevIsSpeakList]);
        }
    };

    const leaveSession = () => {
        if (!session) return;
        session?.disconnect();

        // Empty all properties...
        setPublisher(null);
        setSubscribers([]);
    };

    const leaveSessionForScreenSharing = () => {
        if (!sessionForScreenSharing) return;
        sessionForScreenSharing?.disconnect();
        setMainStreamManager(null);
    };

    const stopScreenShare = () => {
        if (!sessionForScreenSharing) return;
        if (!publisherForScreenSharing) return;
        sessionForScreenSharing.unpublish(publisherForScreenSharing);
        setDoStopScreenSharing(false);
        setDoScreenSharing(false);
    };

    const startScreenShare = async () => {
        const newOV = new OpenVidu();
        newOV.enableProdMode();
        const newSession = newOV.initSession();

        await getToken().then((token) => {
            // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
            // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
            newSession
                .connect(token, { clientData: initScreenData.myScreenName })
                .then(() => {
                    // --- 5) Get your own camera stream ---

                    // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                    // element: we will manage it on our own) and with the desired properties
                    newOV
                        .initPublisherAsync(initScreenData.myScreenName, {
                            audioSource: false, // The source of audio. If undefined default microphone
                            // videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                            videoSource: "screen", // The source of video. If undefined default webcam
                            publishAudio: false,
                            publishVideo: true,
                            resolution: "1280x720", // The resolution of your video
                            frameRate: 10, // The frame rate of your video
                            // insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                        })
                        .then((newPublisher) => {
                            newSession.publish(newPublisher);
                            setPublisherForScreenSharing(newPublisher);
                            setDoScreenSharing(true);
                            setDoStartScreenSharing(false);

                            setOVForScreenSharing(newOV);
                            setSessionForScreenSharing(newSession);
                        })
                        .catch(() => {
                            setDoStartScreenSharing(false);
                        });
                })
                .catch((error) => {
                    console.warn(
                        "There was an error connecting to the session:",
                        error.code,
                        error.message
                    );
                });
        });
    };

    useEffect(() => {
        if (redirect) {
            return;
        }
        localStorage.setItem("questionList", JSON.stringify(questionList));
    }, [questionList]);

    const getToken = async () => {
        return createSession(pathname.substring(11)).then((sId) =>
            createToken(sId)
        );
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

    useEffect(() => {
        const interviewRoomId = location.pathname.replace("/studyroom/", "");
        let subscription;
        if (redirect) {
            dispatch(setRedirect(false));
            dispatch(interviewActions.setMyRoll(null));
            dispatch(clearCurrentRoom());
            if (subscription) {
                subscription.unsubscribe();
            }
            navigate("/studylist");
            return;
        }

        async function initialize() {
            const resultAction = await dispatch(
                interviewSubscribe({ client, interviewRoomId })
            );

            // action.payload에서 subscription 객체를 추출
            if (interviewSubscribe.fulfilled.match(resultAction)) {
                subscription = resultAction.payload;
            }

            if (!isHost) {
                dispatch(
                    userJoinRoomPub({
                        client: client,
                        interviewRoomId,
                        userJoinData: user,
                    })
                );
                console.log("일반 유저가 pub ", interviewRoomId, user);
            }

            // 조인 이후, DB에서 방 데이터 가져와서 curretRoom에 넣기.
            if (!isHost) {
                dispatch(joinInterviewRoom(interviewRoomId));
                console.log(
                    "일반 유저 입장 (입장 로직까지 진행) - DB 데이터 가져오기"
                );
            } else {
                dispatch(hostJoinInterviewRoom(interviewRoomId));
                console.log("방장 입장 - 단순 DB 데이터 가져오기");
            }

            setInitialized(true);
        }

        initialize();

        return () => {
            // dispatch(closeWebSocket());
            dispatch(clearCurrentRoom());
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [currentRoom]);

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
                        setIsVideoOn={setIsVideoOn}
                        isVideoOn={isVideoOn}
                    />
                ) : role === "interviewer" ? (
                    <StudyRoomInterviewer
                        questionList={questionList}
                        setQuestionList={setQuestionList}
                        // feedbackList={feedbackList}
                        // setFeedbackList={setFeedbackList}
                        streamManager={publisher}
                        subscribers={subscribers}
                        isScreenSharing={isScreenSharing}
                        isSpeakList={isSpeakList}
                        isHideCam={isHideCam}
                        peopleList={peopleList}
                        setIsVideoOn={setIsVideoOn}
                        isVideoOn={isVideoOn}
                        setIsAudioOn={setIsAudioOn}
                        isAudioOn={isAudioOn}
                    />
                ) : (
                    <StudyRoomInterviewee
                        questionList={questionList}
                        setQuestionList={setQuestionList}
                        peopleList={peopleList}
                        subscribers={subscribers}
                        streamManager={publisher}
                        setIsVideoOn={setIsVideoOn}
                        isVideoOn={isVideoOn}
                        setIsAudioOn={setIsAudioOn}
                        isAudioOn={isAudioOn}
                    />
                )
            ) : (
                <p>Loading...</p> // 이 부분은 로딩 표시로 대체할 수 있습니다.
            )}
        </div>
    );
};

export default StudyRoom;
