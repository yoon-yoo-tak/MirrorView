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
                const { top, bottom } =
                    scrollevent1.current.getBoundingClientRect();
                setShowContent1(top <= window.innerHeight && bottom >= 0);
            }
        };

        const handlescrollevent2 = () => {
            if (scrollevent2.current) {
                const { top, bottom } =
                    scrollevent2.current.getBoundingClientRect();
                setShowContent2(top <= window.innerHeight && bottom >= 0);
            }
        };

        const handlescrollevent3 = () => {
            if (scrollevent3.current) {
                const { top, bottom } =
                    scrollevent3.current.getBoundingClientRect();
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
                <S.ImageWrapper>
                    <img
                        src={process.env.PUBLIC_URL + "/gomin.png"}
                        alt="main_bg2"
                    />
                </S.ImageWrapper>

                <S.ImageWrapper8>
                    <img
                        src={process.env.PUBLIC_URL + "/bubble2.png"}
                        alt="main_bg2"
                    />
                </S.ImageWrapper8>

                <S.ImageWrapper1>
                    <S.GrayWave></S.GrayWave>
                </S.ImageWrapper1>

                <S.ImageWrapper2 ref={scrollevent1} show={showContent1}>
                    <S.SearchBar1></S.SearchBar1>
                </S.ImageWrapper2>

                <S.ImageWrapper3 ref={scrollevent1} show={showContent1}>
                    <S.SearchBar2></S.SearchBar2>
                </S.ImageWrapper3>

                <S.ImageWrapper4 ref={scrollevent1} show={showContent1}>
                    <S.SearchBar3></S.SearchBar3>
                </S.ImageWrapper4>

                <S.ImageWrapper5 ref={scrollevent2} show={showContent2}>
                    <S.SearchBar4></S.SearchBar4>
                </S.ImageWrapper5>

                <S.ImageWrapper6 ref={scrollevent3} show={showContent3}>
                    <S.SearchBar5></S.SearchBar5>
                </S.ImageWrapper6>

                <S.Image src="/bground.png" alt="main_bg" />

                <S.Content1>
                    <S.Title1>청춘들의 면접 플랫폼</S.Title1>
                    <S.Title2>밀어:뷰</S.Title2>
                </S.Content1>

                <S.Content2>
                    <S.Comment1>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;면접
                        준비 어떻게 시작하지..? <br></br>
                        &nbsp;&nbsp;사람 구하고, 날짜 정하고, <br></br>플랫폼
                        정하고.. 너무 번거로워 ! <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;쉽게할 수 있는 면접 스터디{" "}
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;어디
                        없을까? <br></br>
                    </S.Comment1>
                </S.Content2>

                <S.Content3 ref={scrollevent1} show={showContent1}>
                    안녕하세요 밀어:뷰 입니다.<br></br>
                    궁금한 것을 모두 물어보세요 !
                </S.Content3>

                <S.Comment2 ref={scrollevent1} show={showContent1}>
                    밀어뷰의 기능은 어떤 것들이 있나요 ?
                </S.Comment2>

                <S.Comment3 ref={scrollevent1} show={showContent1}>
                    밀어:뷰는 온라인 면접 스터디 플랫폼 입니다.<br></br>
                    스터디를 직접 찾아보고 구해야 하는 번거로움을 덜어드립니다.{" "}
                    <br></br>
                    카테고리 선택 후 빠른 면접스터디 참여가 가능하고, <br></br>
                    면접관의 역할도 경험해 볼 수 있습니다. <br></br>
                    <br></br>
                    또한 제공되는 피드백 아카이브를 활용하여 본인의 강점/약점을
                    <br></br>
                    파악하여 활용할 수 있습니다.
                </S.Comment3>

                <S.Comment4 ref={scrollevent2} show={showContent2}>
                    누구나 사용할 수 있나요 ?
                </S.Comment4>

                <S.Comment5 ref={scrollevent2} show={showContent2}>
                    네 ! 면접 준비가 필요하신 분이라면 남여노소 누구나 <br></br>
                    사용이 가능합니다. <br></br>
                    급하게 면접 준비가 필요하신 분 , 미리 면접을 준비하면서{" "}
                    <br></br>
                    필요 역량을 기르고 싶으신 모든 분들에게 "밀어:뷰"를<br></br>
                    적극 추천 합니다!
                </S.Comment5>
            </S.Container>

            <Footer />
        </div>
    );
};

export default AboutusPage;
