import * as S from "./StudyRoomStyledComponents";

const StudyRoomInterviewee = ({ peopleList }) => {
    return (
        <S.page>
            <S.vieweeWrap>
                <S.mainWrap>
                    <S.mainBox></S.mainBox>
                    <S.roomTitle>면접방 제목</S.roomTitle>
                    <S.exitRoom menu="viewee">나가기</S.exitRoom>
                </S.mainWrap>

                <S.leftBox>
                    {peopleList.map((person, index) => (
                        <S.boxes>{person.name}</S.boxes>
                    ))}
                </S.leftBox>
            </S.vieweeWrap>
        </S.page>
    );
};

export default StudyRoomInterviewee;
