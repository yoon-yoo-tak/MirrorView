import * as S from "./StudyStyledComponents";

const StudyRoomThumbnail = (props) => {
    return (
        <S.thumbnailPage>
            <S.titleAndHost>
                <div>{props.title}</div>
                <div>{props.host}</div>
            </S.titleAndHost>
            <S.personAndButton>
                <div>
                    {props.nowPerson} / {props.maxPerson}
                </div>
                <S.enterButtonDiv>
                    <S.enterButton>입장하기</S.enterButton>
                </S.enterButtonDiv>
            </S.personAndButton>
        </S.thumbnailPage>
    );
};

export default StudyRoomThumbnail;
