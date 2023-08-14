import React from "react";
import * as S from "../../components/home/HomePageComponent";
import Header from "../../components/common/HeaderComponent";
import Footer from "../../components/common/FooterComponent";

const Home = () => {
    return (
        <div>
            <Header />
            <S.Container>
                <S.Image src="/bground2.png" alt="HomePageBG" />

                <S.Content>
                    <S.FirstTitle style={{ top: "1180px", left: "30px" }}>
                        {'"청춘"들의 면접 플랫폼'}
                    </S.FirstTitle>

                    <S.SecondTitle style={{ top: "1150px", left: "30px" }}>
                        {"밀어 : 뷰 "}
                    </S.SecondTitle>

                    <S.ImageWrapper style={{ top: "450px", right: "-900px" }}>
                        <img
                            src={process.env.PUBLIC_URL + "/mirlogo4.png"}
                            alt="HomePageLg1"
                        />
                    </S.ImageWrapper>

                    <S.Title3 style={{ top: "500px", right: "-400px" }}>
                        {"밀어뷰'S 베네핏!"}

                        <S.ImageWrapper2
                            style={{ top: "-290px", right: "-190px" }}
                        >
                            <img
                                src={process.env.PUBLIC_URL + "/one.png"}
                                alt="RedCircle"
                            />
                        </S.ImageWrapper2>
                    </S.Title3>

                    <S.ImageWrapper3 style={{ top: "30px", right: "-910px" }}>
                        <img
                            src={process.env.PUBLIC_URL + "/dongle3.png"}
                            alt="MeetingLG"
                        />
                    </S.ImageWrapper3>

                    <S.Benefit style={{ top: "-400px", right: "-40px" }}>
                        몇번의 Click만으로 진행되는 온라인 면스 !
                        <S.BenefitWrapper
                            style={{ top: "-40px", right: "10px" }}
                        >
                            <img
                                src={process.env.PUBLIC_URL + "/hi.png"}
                                alt="highlight"
                            />
                        </S.BenefitWrapper>
                    </S.Benefit>

                    <S.Benefit2 style={{ top: "-400px", right: "-130px" }}>
                        시간 제약 없이 가능한 온라인 면스 !
                        <S.BenefitWrapper2
                            style={{ top: "0px", right: "70px" }}
                        >
                            <img
                                src={process.env.PUBLIC_URL + "/hi.png"}
                                alt="highlight"
                            />
                        </S.BenefitWrapper2>
                    </S.Benefit2>

                    <S.Benefit3 style={{ top: "-350px", right: "-260px" }}>
                        나만의 피드백 아카이브로 성장 가능성 Up
                        <S.BenefitWrapper3
                            style={{ top: "0px", right: "70px" }}
                        >
                            <img
                                src={process.env.PUBLIC_URL + "/hi.png"}
                                alt="highlight"
                            />
                        </S.BenefitWrapper3>
                    </S.Benefit3>
                </S.Content>
            </S.Container>
            <Footer />
        </div>
    );
};

export default Home;
