import { useEffect, useState } from "react";

import * as S from "../StudyRoomStyledComponents";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateStarted } from "store/InterviewStore";
const StudyRating = ({ peopleList, setModalStates }) => {
const dispatch = useDispatch();
  const [ratingData, setRatingdata] = useState([]);
  const members = useSelector(
    (state) => state.interviewWebSocket.currentRoom.members
  );
  const [nicknames, setNicknames] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setNicknames(
      members
        .filter((member) => member.nickname !== user.nickname)
        .map((member) => member.nickname)
    );
  }, []);
  const handleRatingChange = (name) => (newValue) => {
    console.log(name, newValue);
    const target = ratingData.find((person) => person.nickname === name);
    if (target) {
      setRatingdata((prevData) =>
        prevData.map((item) =>
          item.nickname === name ? { ...item, rate: newValue } : item
        )
      );
    } else {
      setRatingdata((prevData) => [
        ...prevData,
        { nickname: name, rate: newValue },
      ]);
    }
  };

  const handleSubmit = () => {
    console.log(ratingData);
    let checkNull = true;
    ratingData.forEach((rating) => {
      if (!rating.rate) {
        checkNull = false;
        return;
      }
    });
    console.log(checkNull);
    if (ratingData.length === nicknames.length && checkNull) {
      ratingData.forEach((item) => {
        axios.post("api/users/rating/save",{
            nickname:item.nickname,
            score:item.rate,
        }).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
        setModalStates(false);
        dispatch(updateStarted(false));
      });
    } else {
      alert("모든 참여자에 대해 별점을 눌러주세요!");
    }
  };

  return (
    <S.ratingBackDrop>
      <S.ratingPage>
        <S.ratingWrap>
          <S.ratingTitle>
            <div>참여자들에게 별점을 남겨주세요!</div>
          </S.ratingTitle>
          <S.ratingSection>
            {nicknames.map((person, index) => (
              <S.ratingContent>
                <div>{person}님</div>
                <Rating
                  name="star-rating"
                  defaultValue={0}
                  value={ratingData.rate}
                  precision={0.5}
                  size="large"
                  onChange={(event, newValue) =>
                    handleRatingChange(person)(newValue)
                  }
                />
              </S.ratingContent>
            ))}
          </S.ratingSection>
          <S.ratingButton onClick={handleSubmit}>제출하기</S.ratingButton>
        </S.ratingWrap>
      </S.ratingPage>
    </S.ratingBackDrop>
  );
};

export default StudyRating;
