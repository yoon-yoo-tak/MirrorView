import * as S from "./StudyStyledComponents";

const StudyRoomThumbnail = (props) => {
    const handleEnter = () => {
        if (
            window.confirm(
                `${props.host}님이 생성한 ${props.title}에 입장하시겠습니까?`
            )
        ) {
            // 방 입장 api
        }
    };
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
                    <S.enterButton onClick={() => handleEnter(props)}>
                        입장하기
                    </S.enterButton>
                </S.enterButtonDiv>
            </S.personAndButton>
        </S.thumbnailPage>
    );
};

export default StudyRoomThumbnail;
