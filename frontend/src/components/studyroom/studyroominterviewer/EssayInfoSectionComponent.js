import { useState } from "react";

import * as S from "../StudyRoomStyledComponents";
import StudyEssayDetail from "../studyroombefore/preparesection/studypreparedetail/StudyEssayDetailComponent";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const EssayInfoSection = ({ peopleList, questionList }) => {
  // const [checkEssay, setCheckEssay] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const members = useSelector(
    (state) => state.interviewWebSocket.currentRoom.members
  );
  const [nickname, setNickname] = useState(null);
  const handleCheckWho = (e) => {
    // setNickname(nickname);
    setNickname(e.target.value);
    // console.log(target.nickname);
    // console.log(target.essays);
    // if (target.essays.length!=0) {
    //     setCheckEssay(target.essays[0]);
    // }else{
    //     setCheckEssay([]);
    // }
  };

  const style = {
    fontFamily: "HakgyoansimWoojuR",
  };

  return (
    <div>
      <S.profileAndEssayWrap>
        <S.contentTapWrap>
          <S.contentTapList>
            {/* {members.map((member, index) => (
                            <S.contentTap
                                key={index}
                                onClick={() => handleCheckWho(member.nickname)}
                            >
                                {member.nickname}
                            </S.contentTap>
                        ))} */}
            {/* {members
                            .filter(
                                (member) => member.nickname !== user.nickname
                            )
                            .map((member, index) => (
                                <S.contentTap
                                    key={index}
                                    onClick={() =>
                                        handleCheckWho(member.nickname)
                                    }
                                >
                                    {member.nickname}
                                </S.contentTap>
                            ))} */}

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelid="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={nickname || ""}
                onChange={handleCheckWho}
                style={style}>
                {members
                  .filter((member) => member.nickname !== user.nickname)
                  .map((member, index) => (
                    <MenuItem
                      style={style}
                      value={member.nickname}
                      key={index}
                      // onClick={() =>
                      //     handleCheckWho(member.nickname)
                      // }
                    >
                      {member.nickname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </S.contentTapList>
          <S.contentDetail>
            {!nickname ? (
              <S.profileContent>
                참여자를 클릭해 자소서를 확인하세요!
              </S.profileContent>
            ) : (
              <StudyEssayDetail
                nickname={nickname}
                onAir={true}
                before={false}
              />
            )}
          </S.contentDetail>
        </S.contentTapWrap>
      </S.profileAndEssayWrap>
    </div>
  );
};

export default EssayInfoSection;
