import PrepareSection from "../../components/studyroom/studyroombefore/PrepareSectionComponent";
import SelectInterviewee from "../../components/studyroom/studyroombefore/SelectIntervieweeComponent";
import * as S from "../../components/studyroom/StudyRoomStyledComponents";
import StudyRoomBefore from "../../components/studyroom/StudyRoomBeforeComponent";
// import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import StudyRoomInterviewer from "../../components/studyroom/StudyRoomInterviewerComponent";
import { useLocation } from "react-router";
import { OpenVidu } from "openvidu-browser";
import { async } from "q";
import axios from "axios";
import { useSelector } from "react-redux";
import { MS } from "stylis";

const StudyRoom = () => {
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
    const {user} = useSelector((state)=>state.auth);
    const [questionList, setQuestionList] = useState([]);
    const [OV, setOV] = useState(null);
    const [session, setSession] = useState("");
    const [mySession, setMySession] = useState("");
    const [subscribers, setSubscribers] = useState([]);
    const [currentVideoDevice,setCurrentVideoDevice] = useState(null);
    const [mainStreamManager, setMainStreamManger] = useState(null);
    const [publisher, setPublisher] = useState(null);
    useEffect(() => {
        const storedList = localStorage.getItem("questionList");
        if (storedList) {
            setQuestionList(JSON.parse(storedList));
        }
    }, []);
    const {pathname} = useLocation();
    useEffect(() =>{
        setMySession(pathname.substring(11));
        joinSession();
    },[])

    const joinSession = () =>{
        setOV(new OpenVidu());
        setSession(OV.initSession())
        .then(()=>{
            const ms = session;

            ms.on('streamCreated', (event)=>{
                var subscriber = ms.subscribe(event.strea,undefined);
                var subs = subscribers;
                subs.push(subscriber);

                setSubscribers(subs);
            });

            ms.on('streamDestroyed',(event)=>{

                deleteSubscriber(event.stream.streamManger);
            });

            ms.on('exception', (exception)=>{
                console.warn(exception);
            });

            getToken().then((token)=>{
                ms.connect(token, {clientData:user.nickname})
                .then(async () =>{
                    let pub = await OV.initPublisherAsync(undefined,{
                        audioSource: undefined, // The source of audio. If undefined default microphone
                        videoSource: undefined, // The source of video. If undefined default webcam
                        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                        publishVideo: true, // Whether you want to start publishing with your video enabled or not
                        resolution: '640x480', // The resolution of your video
                        frameRate: 30, // The frame rate of your video
                        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                        mirror: false, // Whether to mirror your local video or not
                    });

                    ms.publish(pub);

                    var devices = await OV.getDevices();
                    var videoDevices = devices.filter(device => device.kind === 'videoinput');
                    var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                    var cvd = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                    setCurrentVideoDevice(cvd);
                    setMainStreamManger(pub);
                    setPublisher(pub);

                })
                .catch((error)=>{
                    console.log(error.code, error.message);
                });
            });
        },
        );

    }

    useEffect(() => {
        localStorage.setItem("questionList", JSON.stringify(questionList));
    }, [questionList]);

    const deleteSubscriber = (streamManger) =>{
        let subs = subscribers;
        let index = subs.indexOf(streamManger,0);
        if( index > -1){
            subs.splice(index, 1);
            setSubscribers(subs);
        }
    }

    const getToken = async() => {
        const sId = await createSession(mySession);
        return await createToken(sId);
    };

    const createSession = async(sessionId) => {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/sessions`,{customSessionId : sessionId},{
            headers : {'Content-Type':'application/json',},
        });
        return response.data;
    };

    const createToken = async(sessionId) => {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/sessions/${sessionId}/connections`,{},{
            headers: {'Content-Type':'application/json',},
        });
        return response.data;
    }

    return (
        <div>
            <StudyRoomBefore
                streamManager ={publisher}
                questionList={questionList}
                setQuestionList={setQuestionList}
                peopleList={peopleList}
            />
            {/* <StudyRoomInterviewer
                questionList={questionList}
                setQuestionList={setQuestionList}
                peopleList={peopleList}
            /> */}
        </div>
    );
};

export default StudyRoom;
