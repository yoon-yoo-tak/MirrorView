import React from 'react';
import * as S from "../../components/home/HomePageComponent";


const Home = () => {
  return (
    <S.Container>
      <S.Image src='/bground2.png' alt='main_bg' />
      {/* <S.page /> */}
      <S.Content>
        <S.Title>"청춘" 들의 면접 플랫폼</S.Title>
        <S.Title2> 밀어 : 뷰 </S.Title2>
        <S.ImageWrapper>
        <img src={process.env.PUBLIC_URL + '/mirlogo4.png'} alt="main_bg2" />
        </S.ImageWrapper>
        <S.ImageWrappe4>
        <img src={process.env.PUBLIC_URL + '/hi.png'} alt="main_bg2" />  
        </S.ImageWrappe4>
        <S.ImageWrappe5>
        <img src={process.env.PUBLIC_URL + '/hi.png'} alt="main_bg2" />  
        </S.ImageWrappe5>
        <S.ImageWrappe6>
        <img src={process.env.PUBLIC_URL + '/hi.png'} alt="main_bg2" />  
        </S.ImageWrappe6>
      </S.Content>
      <S.Content2>
        <S.Title3>
          밀어뷰'S BENEFIT
        </S.Title3>
        <S.ImageWrapper2>
        <img src={process.env.PUBLIC_URL + '/one.png'} alt="star"/>
        </S.ImageWrapper2>
      </S.Content2>
      <S.Content3>
        <S.ImageWrapper3>
        <img src={process.env.PUBLIC_URL + '/dongle3.png'} alt="dongle"/>
        </S.ImageWrapper3>
        <S.Title4>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 몇번의 Click만으로 진행되는 온라인 면스 ! 
          <br></br>
          <br></br>
          <br></br>
         시간 제약 없이 가능한 온라인 면스 ! <br></br> 
          <br></br>
          <br></br>
          &nbsp; &nbsp; &nbsp; &nbsp; 나만의 피드백 아카이브로 성장 가능성 Up ↗
        </S.Title4>
      </S.Content3>

    </S.Container>
  );
};

export default Home;