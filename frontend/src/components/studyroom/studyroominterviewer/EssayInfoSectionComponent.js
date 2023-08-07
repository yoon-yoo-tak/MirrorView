import { useState } from "react";

import * as S from "../StudyRoomStyledComponents";
import StudyEssayDetail from "../studyroombefore/preparesection/studypreparedetail/StudyEssayDetailComponent";
import { useSelector } from 'react-redux';

const EssayInfoSection = ({ peopleList, questionList }) => {
    const [checkEssay, setCheckEssay] = useState([]);
    const members = useSelector((state)=>state.interviewWebSocket.currentRoom.members);

    const handleCheckWho = (index) => {
        const target =members[index];
        console.log(target.essays);
        if (target.essays.length!=0) {
            setCheckEssay(target.essays[0]);    
        }else{
            setCheckEssay([]);
        }
        
    };

    return (
        <div>
            <S.profileAndEssayWrap>
                <S.contentTapWrap>
                    <S.contentTapList>
                        {members.map((member, index) => (
                            <S.contentTap
                                key = {index}
                                onClick={() => handleCheckWho(index)}
                            >
                                {member.nickname}
                            </S.contentTap>
                        ))}
                    </S.contentTapList>
                    <S.contentDetail>
                        {checkEssay.length === 0 ? (
                            <S.profileContent>
                                참여자를 클릭해 정보를 확인하세요!
                            </S.profileContent>
                        ) : (
                            <StudyEssayDetail essay={checkEssay} onAir={true} />
                        )}
                    </S.contentDetail>
                </S.contentTapWrap>
            </S.profileAndEssayWrap>
        </div>
    );
};

export default EssayInfoSection;
