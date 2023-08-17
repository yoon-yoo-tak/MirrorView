import React, { useEffect, useRef, useState } from "react";
import * as S from "../../components/aboutus/AboutusPageComponent";
import Header from "../../components/common/HeaderComponent";
import Footer from "../../components/common/FooterComponent";

const AboutusPage = () => {
  const scrollevent1 = useRef(null);
  const [showContent1, setShowContent1] = useState(false);

  const scrollevent2 = useRef(null);
  const [showContent2, setShowContent2] = useState(false);

  const scrollevent3 = useRef(null);
  const [showContent3, setShowContent3] = useState(false);

  useEffect(() => {
    const handlescrollevent1 = () => {
      if (scrollevent1.current) {
        const { top, bottom } = scrollevent1.current.getBoundingClientRect();
        setShowContent1(top <= window.innerHeight && bottom >= 0);
      }
    };

    const handlescrollevent2 = () => {
      if (scrollevent2.current) {
        const { top, bottom } = scrollevent2.current.getBoundingClientRect();
        setShowContent2(top <= window.innerHeight && bottom >= 0);
      }
    };

    const handlescrollevent3 = () => {
      if (scrollevent3.current) {
        const { top, bottom } = scrollevent3.current.getBoundingClientRect();
        setShowContent3(top <= window.innerHeight && bottom >= 0);
      }
    };

    window.addEventListener("scroll", handlescrollevent1);
    window.addEventListener("scroll", handlescrollevent2);
    window.addEventListener("scroll", handlescrollevent3);

    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      window.removeEventListener("scroll", handlescrollevent1);
      window.removeEventListener("scroll", handlescrollevent2);
      window.removeEventListener("scroll", handlescrollevent3);
    };
  }, []);

  return (
    <div>
      <Header />
      <S.Container>
        <S.Image src="/bground.png" alt="main_bg" />

        <S.Content>
          <S.MainComment style={{ top: "800px", left: "-30px" }}>
            청춘들의 면접 플랫폼
          </S.MainComment>

          <S.MainComment2 style={{ top: "800px", left: "-30px" }}>
            밀어:뷰
          </S.MainComment2>

          <S.AboutusThinkImage style={{ top: "1000px", left: "890px" }}>
            <img
              src={process.env.PUBLIC_URL + "/gomin.png"}
              alt="AboutusThink"
            />
          </S.AboutusThinkImage>

          <S.AboutusThinkBubble style={{ top: "390px", left: "620px" }}>
            <img
              src={process.env.PUBLIC_URL + "/bubble2.png"}
              alt="AboutusChatBubble"
            />
            <S.BubbleConmmentWrapper style={{ top: "-350px", left: "-20px" }}>
              <S.BubbleComment>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;면접
                준비 어떻게 시작하지..? <br></br>
                &nbsp;&nbsp;사람 구하고, 날짜 정하고,<br></br>
                플랫폼 정하고.. 너무너무 번거로워 ! <br></br>
                &nbsp;쉽게할 수 있는 온라인 면접 스터디 <br></br> 어디 없을까??{" "}
                <br></br>
              </S.BubbleComment>
            </S.BubbleConmmentWrapper>
          </S.AboutusThinkBubble>

          <S.GrayWave style={{ top: "430px", left: "400px" }}></S.GrayWave>

          {/* 대화방 */}

          <S.ChatBuubleOne
            ref={scrollevent1}
            show={showContent1 ? "true" : undefined}
            style={{ top: "550px", left: "550px" }}>
            <S.BubbleOneWrapper>
              <S.BubbleOneComment
                ref={scrollevent1}
                show={showContent1 ? "true" : undefined}
                style={{
                  position: "absolute",
                  left: "35px",
                }}>
                안녕하세요 밀어:뷰 입니다.<br></br>
                궁금한 것을 모두 물어보세요 !
              </S.BubbleOneComment>
            </S.BubbleOneWrapper>
          </S.ChatBuubleOne>

          <S.ChatBuubleTwo
            ref={scrollevent1}
            show={showContent1 ? "true" : undefined}
            style={{ top: "450px", left: "1530px" }}>
            <S.BubbleTwoWrapper>
              <S.BubbleTwoComment
                ref={scrollevent1}
                show={showContent1 ? "true" : undefined}>
                밀어뷰의 기능은 어떤 것들이 있나요 ?
              </S.BubbleTwoComment>
            </S.BubbleTwoWrapper>
          </S.ChatBuubleTwo>

          <S.ChatBuubleThree
            ref={scrollevent1}
            show={showContent1 ? "true" : undefined}
            style={{ top: "350px", left: "550px" }}>
            <S.BubbleThreeWrapper>
              <S.BubbleThreeComment
                ref={scrollevent1}
                show={showContent1 ? "true" : undefined}
                style={{
                  position: "absolute",
                  left: "35px",
                }}>
                밀어:뷰는 온라인 면접 스터디 플랫폼 입니다.
                <br></br>
                스터디를 직접 찾아보고 구해야 하는 번거로움을 덜어드립니다.{" "}
                <br></br>
                카테고리 선택 후 빠른 면접스터디 참여가 가능하고, <br></br>
                면접관의 역할도 경험해 볼 수 있습니다. <br></br>
                <br></br>
                또한 제공되는 피드백 아카이브를 활용하여 본인의 강점/약점을
                <br></br>
                파악하여 활용할 수 있습니다.
              </S.BubbleThreeComment>
            </S.BubbleThreeWrapper>
          </S.ChatBuubleThree>

          <S.ChatBuubleFour
            ref={scrollevent2}
            show={showContent2 ? "true" : undefined}
            style={{ top: "550px", left: "1450px" }}>
            <S.BubbleFourWrapper>
              <S.BubbleFourComment
                ref={scrollevent2}
                show={showContent2 ? "true" : undefined}
                style={{
                  position: "absolute",
                  left: "25px",
                }}>
                밀어뷰는 모든 면접 준비생이 이용 가능한가요? <br></br>
              </S.BubbleFourComment>
            </S.BubbleFourWrapper>
          </S.ChatBuubleFour>

          <S.ChatBuubleFive
            ref={scrollevent3}
            show={showContent3 ? "true" : undefined}
            style={{ top: "450px", left: "550px" }}>
            <S.BubbleFiveWrapper>
              <S.BubbleFiveComment
                ref={scrollevent3}
                show={showContent3 ? "true" : undefined}
                style={{
                  position: "absolute",
                  left: "30px",
                }}>
                네 맞습니다! 면접 준비가 필요하신 분이라면 <br></br>
                남여노소 누구나 사용이 가능합니다. <br></br>
                급하게 면접 준비가 필요하신 분 , 면접을 미리 준비하면서{" "}
                <br></br>
                역량을 기르고 싶으신 모든 분들에게 &nbsp; "밀어:뷰"를
                <br></br>
                적극 추천 합니다!
              </S.BubbleFiveComment>
            </S.BubbleFiveWrapper>
          </S.ChatBuubleFive>

          <S.ChatBuubleSix
            ref={scrollevent3}
            show={showContent3 ? "true" : undefined}
            style={{ top: "530px", left: "1600px" }}>
            <S.BubbleSixWrapper>
              <S.BubbleSixComment
                ref={scrollevent3}
                show={showContent3 ? "true" : undefined}>
                헐 지금 즉시 하러 가야겠다.<br></br>
                고마워요 밀어뷰 ~
              </S.BubbleSixComment>
            </S.BubbleSixWrapper>
          </S.ChatBuubleSix>
        </S.Content>
      </S.Container>
      <Footer />
    </div>
  );
};

export default AboutusPage;
