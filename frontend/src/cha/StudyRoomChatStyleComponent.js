import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 95%;
  margin: 1rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid #ccc;
`;

export const ChatWindow = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.625rem;
  border-radius: 0.625rem 0.625rem 0 0;
`;

export const ChatInputContainer = styled.div`
  display: flex;
  padding: 0.625rem;
  border-top: 0.0625rem solid #ccc;
  border-radius: 0 0 0.625rem 0.625rem;
`;

export const MessageInput = styled.input`
  flex: 1;
  margin-right: 0.625rem;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  border: 0.0625rem solid lightgrey; // 연한 회색 테두리 추가
`;

export const SendButton = styled.button`
  border-radius: 0.3125rem;
  padding: 0.3125rem 0.625rem;
  background-color: #ff95b9; // 버튼 배경 색상
  color: black; // 텍스트 색상 변경
  border: none; // 테두리 제거
  cursor: pointer; // 마우스 포인터 변경
  &:hover {
    background-color: #ff6f97; // 마우스 오버시 색상 변경
    color: white;
  }
`;
