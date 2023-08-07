import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from "axios";

import { user } from "../../../../store/AuthStore"
import * as S from "../../StudyRoomStyledComponents";
import StudyMyEssaySelected from "./StudyMyEssaySelectedComponent";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchEssays } from "store/InterviewWebSocketStore";

const StudyMyEssay = () => {
    const dispatch = useDispatch();
    const myNickname = useSelector((state) => (state.auth.user.nickname));
    const userInfo = useSelector((state) => {
        const members = state.interviewWebSocket.currentRoom.members;
        const filteredMembers = members.filter((member) => member.nickname === myNickname);
        return filteredMembers[0]; // 첫 번째 요소만 반환
    });

    useEffect(() => {
        dispatch(fetchEssays(myNickname));
    }, [dispatch, myNickname]);

    const [selectedValueIndex, setSelectedValueIndex] = useState(0);
    const [isMainChecked, setMainChecked] = useState(false);
    const [mainEssay, setMainEssay] = useState(null);

    const handleEssayChange = (e) => {
        setSelectedValueIndex(e.target.value);
    };

    const style = {
        fontFamily: "HakgyoansimWoojuR"
    };

    return (
        <div>
            <S.myEssayWrap>
                <S.myEssaySide>
                    <S.myEssayIntro>
                        {userInfo.nickname}님의 자기소개서
                    </S.myEssayIntro>
                    {!isMainChecked && (
                        <S.myEssayMain>
                            자소서 본문을 클릭해서 메인 자소서를 설정하세요
                        </S.myEssayMain>
                    )}
                    {mainEssay === selectedValueIndex && (
                        <S.myEssayMain>
                            메인 자소서로 설정되어있어요
                        </S.myEssayMain>
                    )}
                </S.myEssaySide>
                <hr />

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={selectedValueIndex}
                        onChange={handleEssayChange}
                        style={style}
                    >
                        {userInfo.essays.map((essay, index) => (
                            <MenuItem style={style} key={essay.id} value={index}>
                                {essay.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <S.myEssayContentWrap>
                    <StudyMyEssaySelected
                        selectedEssay={userInfo.essays[selectedValueIndex]}
                        selectedValueIndex={selectedValueIndex}
                        mainEssay={mainEssay}
                        setMainEssay={setMainEssay}
                        isMainChecked={isMainChecked}
                        setMainChecked={setMainChecked}
                    />
                </S.myEssayContentWrap>
            </S.myEssayWrap>
        </div>
    );
};

export default StudyMyEssay;
