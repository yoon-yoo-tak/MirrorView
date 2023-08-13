import { useDispatch, useSelector } from "react-redux";
import * as S from "./StudyStyledComponents";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

const StudyRoomThumbnail = (info) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const notifier = new AWN();
    const handleEnter = async () => {
        console.log(info);
        if (!user) {
            // alert("로그인 후 이용 가능합니다.");

            Swal.fire({
                // title: "방 생성을 취소하시겠습니까?",
                title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">로그인 후 이용 가능합니다.<div>',
                icon: "error",
                width: 330,
                confirmButtonColor: "#55A8F5",
                confirmButtonText:
                    '<div style="font-size:15px; font-family: HakgyoansimWoojuR;">확인<div>',
                // buttons: true,
                // dangerMode: true,
            }).then((result) => {
                navigate("/login");
            });

            return;
        }
        if (info.maxMemberCount === info.currentMemberCount) {
            alert("정원 초과입니다.");
            return;
        }
        if (info.havePassword) {
            // let pass = window.prompt("비밀번호를 입력하세요");
            // axios
            //     .post("/api/interviews/join/check", {
            //         roomId: info.roomId,
            //         password: pass,
            //     })
            //     .then(() => {
            //         navigate(`/studyroom/${info.roomId}`, {
            //             state: { isHost: false },
            //         });
            //     })
            //     .catch((error) => {
            //         alert("비밀번호가 틀렸습니다.");
            //         console.log(error);
            //     });
            const { value: password } = await Swal.fire({
                title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">비밀번호를 입력해주세요!<div>',
                input: "password",
                icon: "info",
                width: 330,
                confirmButtonColor: "#55A8F5",
                confirmButtonText:
                    '<div style="font-size:15px; font-family: HakgyoansimWoojuR;">확인<div>',
                // inputPlaceholder: "비밀번호를 입력해주세요",
                inputAttributes: {
                    maxlength: 10,
                    autocapitalize: "off",
                    autocorrect: "off",
                },
            });
            axios
                .post("/api/interviews/join/check", {
                    roomId: info.roomId,
                    password: `${password}`,
                })
                .then(() => {
                    navigate(`/studyroom/${info.roomId}`, {
                        state: { isHost: false },
                    });
                })
                .catch((error) => {
                    alert("비밀번호가 틀렸습니다.");
                    console.log(error);
                });
            return;
        }

        // -------------------------

        // -------------------------

        // if (
        //     window.confirm(`${info.host}님의 ${info.title}에 입장하시겠습니까?`)
        // ) {
        //     navigate(`/studyroom/${info.roomId}`, {
        //         state: { isHost: false },
        //     }); // 이동
        // }

        Swal.fire({
            title: `<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">${info.host}님의 ${info.title}에 입장하시겠습니까?<div>`,
            icon: "question",
            width: 400,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#D4D4D4",
            cancelButtonText: "취소",
            confirmButtonText: "넹",
            // buttons: true,
            // dangerMode: true,
        }).then((result) => {
            if (result.isConfirmed) {
                notifier.success(
                    `<div style="font-size:18px; font-family: HakgyoansimWoojuR;font-weight:bold;">스터디방에 입장합니다.</div>`,
                    {
                        durations: { success: 2000 },
                    }
                );
                navigate(`/studyroom/${info.roomId}`, {
                    state: { isHost: false },
                }); // 이동
            } else if (result.isDenied) {
            }
        });
    };
    return (
        <S.thumbnailPage>
            <S.titleAndHost>
                <S.title>{info.title}</S.title>
                <S.host>{info.host}</S.host>
                <S.cate>{info.category}</S.cate>
            </S.titleAndHost>
            <S.personAndButton>
                <div>
                    {info.currentMemberCount} / {info.maxMemberCount}
                </div>
                <S.enterButtonDiv>
                    <S.enterButton onClick={() => handleEnter(info)}>
                        입장하기
                    </S.enterButton>
                </S.enterButtonDiv>
            </S.personAndButton>
        </S.thumbnailPage>
    );
};

export default StudyRoomThumbnail;
