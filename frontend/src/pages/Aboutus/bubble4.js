import React from 'react';
import styled from 'styled-components';

const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fef01b;
  border: 0px solid #ccc;
  border-radius: 30px;
  padding: 35px 30px;
  width: 320%;
  max-width: 2000px;



  &::after {
    content: '';
    position: absolute;
    top: 43%;
    left: 360px; /* 꼬리 뾰족한 부분을 왼쪽 옆을 향하도록 설정 */
    transform: translateY(-50%) rotate(270deg);
    width: 10;
    height: 10;
    border-left: 20px solid transparent;
    border-right: 20px solid #fef01b; /* 꼬리 뾰족한 부분의 색상 설정 */
    border-bottom: 20px solid transparent;
  }
`;

const Bubble4 = () => {
  return (
    <SearchBar>
      {/* 꼬리 모양이 없으므로 BubbleTail 컴포넌트를 제거합니다. */}
    </SearchBar>
  );
};

export default Bubble4;