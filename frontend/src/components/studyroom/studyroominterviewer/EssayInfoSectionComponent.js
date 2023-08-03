import { useState } from "react";

import * as S from "../StudyRoomStyledComponents";
import StudyEssayDetail from "../studyroombefore/preparesection/studypreparedetail/StudyEssayDetailComponent";

const EssayInfoSection = ({ peopleList }) => {
    const [checkEssay, setCheckEssay] = useState([]);

    const handleCheckWho = (name) => {
        const target = peopleList.find((person) => person.name === name);
        setCheckEssay(target.essay);
    };

    return (
        <div>
            <S.profileAndEssayWrap>
                <S.contentTapWrap>
                    <S.contentTapList>
                        {peopleList.map((people, index) => (
                            <S.contentTap
                                onClick={() => handleCheckWho(people.name)}
                            >
                                {people.name}
                            </S.contentTap>
                        ))}
                    </S.contentTapList>
                    <S.contentDetail>
                        {checkEssay.length === 0 ? (
                            <S.profileContent>
                                참여자를 클릭해 정보를 확인하세요!
                            </S.profileContent>
                        ) : (
                            <StudyEssayDetail essay={checkEssay} />
                        )}
                    </S.contentDetail>
                </S.contentTapWrap>
            </S.profileAndEssayWrap>
        </div>
    );
};

export default EssayInfoSection;
