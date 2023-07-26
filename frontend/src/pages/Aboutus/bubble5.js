import React from 'react';
import styled from 'styled-components';

const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 0px solid #ccc;
  border-radius: 30px;
  padding: 130px 65px;
  width: 550%;
  max-width: 2000px;

  &::before {
    content: '';
    position: absolute;
    transform: translateY(-50%);
    width: 20;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ffffff; /* 꼬리 색상을 배경색과 동일하게 설정 */
  }

  &::after {
    content: '';
    position: absolute;
    top: 20%;
    left: -38px; /* 꼬리 뾰족한 부분을 왼쪽 옆을 향하도록 설정 */
    transform: translateY(-50%);
    width: 10;
    height: 10;
    border-left: 20px solid transparent;
    border-right: 20px solid #ffffff; /* 꼬리 뾰족한 부분의 색상 설정 */
    border-bottom: 20px solid transparent;
  }
`;

const Bubble5 = () => {
  return (
    <SearchBar>
      {/* 꼬리 모양이 없으므로 BubbleTail 컴포넌트를 제거합니다. */}
    </SearchBar>
  );
};

export default Bubble5;