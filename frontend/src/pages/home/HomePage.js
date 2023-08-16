import React from "react";
import * as S from "../../components/home/HomePageComponent";
import Header from "../../components/common/HeaderComponent";
import Footer from "../../components/common/FooterComponent";

const Home = () => {
    return (
        <div>
            <Header />
            <S.Container>
                {/* <S.Image src="/bground2.png" alt="HomePageBG" /> */}

                <S.firstPage>
                    <S.titleWrap>
                        <S.FirstTitle>
                            청춘, 앞으로 나아가는 우리 모두를 위한 면접 플랫폼
                        </S.FirstTitle>

                        <S.SecondTitle>밀어 : 뷰 </S.SecondTitle>
                    </S.titleWrap>

                    <S.ImageWrapper />

                    {/* <img
                            src={process.env.PUBLIC_URL + "/mirlogo4.png"}
                            alt="HomePageLg1"
                        /> */}
                    {/* </S.ImageWrapper> */}
                </S.firstPage>
                <S.secondPage>
                    <S.pointTitleWrap>
                        {/* <S.sparkles></S.sparkles> */}

                        <S.pointTitle>
                            밀어뷰'S 베네핏!<S.sparkles></S.sparkles>
                        </S.pointTitle>
                    </S.pointTitleWrap>

                    {/* <S.ImageWrapper2>
                        <img
                            src={process.env.PUBLIC_URL + "/one.png"}
                            alt="RedCircle"
                        />
                    </S.ImageWrapper2> */}

                    {/* <S.ImageWrapper3>
                        <img
                            src={process.env.PUBLIC_URL + "/dongle3.png"}
                            alt="MeetingLG"
                        />
                    </S.ImageWrapper3> */}

                    <S.pointTextWrap>
                        <S.benefitTap value="first">
                            <S.pointText>
                                몇번의 Click만으로 진행되는 온라인 면스 !
                                {/* <S.BenefitWrapper>
                                <img
                                    src={process.env.PUBLIC_URL + "/hi.png"}
                                    alt="highlight"
                                />
                            </S.BenefitWrapper> */}
                            </S.pointText>
                            <div>그동안 귀찮았던 모든 과정을 한번에!</div>
                        </S.benefitTap>

                        <S.benefitTap value="second">
                            <S.pointText>
                                시간 제약 없이 가능한 온라인 면스 !
                                {/* <S.BenefitWrapper2>
                                <img
                                    src={process.env.PUBLIC_URL + "/hi.png"}
                                    alt="highlight"
                                />
                            </S.BenefitWrapper2> */}
                            </S.pointText>
                            <div>나를 기다리고 있는 실시간 스터디들</div>
                        </S.benefitTap>

                        <S.benefitTap value="third">
                            <S.pointText>
                                나만의 피드백 아카이브로 성장 가능성 Up
                                {/* <S.BenefitWrapper3>
                                <img
                                    src={process.env.PUBLIC_URL + "/hi.png"}
                                    alt="highlight"
                                />
                            </S.BenefitWrapper3> */}
                            </S.pointText>
                            <div>스터디를 진행하며 주고받는 피드백들</div>
                        </S.benefitTap>
                    </S.pointTextWrap>
                </S.secondPage>
            </S.Container>
            <Footer />
        </div>
    );
};

export default Home;
