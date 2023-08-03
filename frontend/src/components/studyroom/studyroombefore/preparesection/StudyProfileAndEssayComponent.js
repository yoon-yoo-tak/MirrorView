import { useState } from "react";

import * as S from "../../StudyRoomStyledComponents";
import StudyProfileDetail from "./studypreparedetail/StudyProfileDetailComponent";
import StudyEssayDetail from "./studypreparedetail/StudyEssayDetailComponent";

const StudyProfileAndEssay = ({ peopleList }) => {
    const [tap, setTap] = useState("profile");
    const [checkProfile, setCheckProfile] = useState({
        name: "",
        rate: "",
        email: "",
    });
    const [checkEssay, setCheckEssay] = useState([]);

    const handleProfileTap = () => {
        setTap("profile");
    };

    const handleEssayTap = () => {
        setTap("essay");
    };

    const handleCheckWho = (name) => {
        const target = peopleList.find((person) => person.name === name);
        setCheckProfile({
            name: target.name,
            rate: target.rate,
            email: target.email,
        });
        setCheckEssay(target.essay);
    };

    return (
        <div>
            <S.profileAndEssayWrap>
                <S.peopleTapWrap>
                    <S.peopleTap>
                        <S.peopleTitle>참여자</S.peopleTitle>
                        <hr />
                        <div>
                            {peopleList.map((people, index) => (
                                <S.peopleName
                                    onClick={() => handleCheckWho(people.name)}
                                >
                                    {people.name}
                                </S.peopleName>
                            ))}
                        </div>
                    </S.peopleTap>
                </S.peopleTapWrap>
                <S.contentTapWrap>
                    <S.contentTapList>
                        <S.contentTap onClick={handleProfileTap}>
                            프로필
                        </S.contentTap>
                        <S.contentTap onClick={handleEssayTap}>
                            자기소개서
                        </S.contentTap>
                    </S.contentTapList>
                    <S.contentDetail>
                        {checkEssay.length === 0 ? (
                            <S.profileContent>
                                참여자를 클릭해 정보를 확인하세요!
                            </S.profileContent>
                        ) : tap === "profile" ? (
                            <StudyProfileDetail profile={checkProfile} />
                        ) : (
                            tap === "essay" && (
                                <StudyEssayDetail essay={checkEssay} />
                            )
                        )}
                    </S.contentDetail>
                </S.contentTapWrap>
            </S.profileAndEssayWrap>
        </div>
    );
};

export default StudyProfileAndEssay;
