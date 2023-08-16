import { useEffect, useState } from "react";

import * as S from "../StudyRoomStyledComponents";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateStarted } from "store/InterviewStore";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { WebSocketContext } from "WebSocketContext";
const StudyRating = ({ peopleList, setModalStates, leaveSession }) => {
  const { client } = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ratingData, setRatingdata] = useState([]);
  const { currentRoom, nicknames } = useSelector(
    (state) => state.interviewWebSocket
  );
  const { user } = useSelector((state) => state.auth);

  const handleRatingChange = (name) => (newValue) => {
    // console.log(name, newValue);
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
  useEffect(() => {
    // console.log(nicknames);
  }, []);

  const handleSubmit = () => {
    // console.log(ratingData);
    let checkNull = true;
    ratingData.forEach((rating) => {
      if (!rating.rate) {
        checkNull = false;
        return;
      }
    });
    // console.log(checkNull);
    if (ratingData.length === nicknames.length && checkNull) {
      ratingData.forEach((item) => {
        axios
          .post("api/users/rating/save", {
            nickname: item.nickname,
            score: item.rate,
          })
          .then((response) => {
            // console.log(response);
          })
          .catch((error) => {
            // console.log(error);
          });
      });
      setModalStates(false);
      const sendUserData = {
        type: "EXIT",
        data: {
          nickname: user.nickname,
        },
      };
      // console.log(currentRoom);
      client.send(
        `/app/interviewrooms/${currentRoom.id}`,
        {},
        JSON.stringify(sendUserData)
      );
      leaveSession();
      updateStarted(null);
      navigate("/");
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
