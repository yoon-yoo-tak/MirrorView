import * as S from "../../../StudyRoomStyledComponents";

const StudyProfileDetail = ({ profile }) => {
    return (
        <div>
            {profile.name === "" && (
                <div>참여자를 클릭해서 정보를 확인하세요!</div>
            )}
            {profile && (
                <div>
                    <S.profileInfo>
                        <S.profileKey>
                            <S.profileContent>닉네임</S.profileContent>
                            <S.profileContent>EMAIL</S.profileContent>
                            <S.profileContent>평점</S.profileContent>
                        </S.profileKey>
                        <S.vLine />
                        <S.profileDetail>
                            <S.profileContent>{profile.nickname}</S.profileContent>
                            <S.profileContent>{profile.email}</S.profileContent>
                            <S.profileContent>{profile.rating}</S.profileContent>
                        </S.profileDetail>
                    </S.profileInfo>
                </div>
            )}
        </div>
    );
};

export default StudyProfileDetail;
