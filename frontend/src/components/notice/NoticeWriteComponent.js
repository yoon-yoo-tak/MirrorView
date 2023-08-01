import { styled } from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
`;

export const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  margin: 0;
  padding: 0;
`;

export const Noticebox = styled.div`
  position: absolute;
  top: 10%;
  left: 7.5%;
  width: 85%;
  height: 80vh;
  border: 0px solid gray;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
`;

export const InfoWrapper = styled.div`
  margin-bottom: 40px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: black;
  margin-bottom: 1rem;
`;

export const Author = styled.span`
  margin-right: 0.5rem;
  margin-left: 1rem;
`;

export const Divider = styled.span`
  margin: 0 0.5rem;
  color: #ccc;
`;

export const Date = styled.span`
  margin-left: 0.5rem;
`;

export const InfoLine = styled.div`
  height: 1px;
  background-color: #ccc;
`;

export const Content = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-top: 1rem;
  margin-left: 1rem;
  white-space: pre-line; 
`;

export const ContentLine = styled.div`
  height: 1px;
  background-color: #ccc;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 7px;
  cursor: pointer;


  &:hover {
    background-color: #40a9ff;
  }
`;


export const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 20px;
`;

export const ContentInput = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
`;

const NoticeWriteComponent = () => {
  return (
    <Container>
      <Image src="/bground.png" alt="main_bg" />
      <Noticebox>
        <TitleInput type="text" placeholder="제목을 입력하세요" />
        <ContentInput placeholder="내용을 입력하세요" />
      </Noticebox>
    </Container>
  );
};

export default NoticeWriteComponent;
