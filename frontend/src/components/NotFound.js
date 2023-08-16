import Header from "./common/HeaderComponent";
import Footer from "./common/FooterComponent";
import * as S from "./otherStyledComponents";

const NotFound = () => {
    return (
        <div>
            <Header />
            <S.notFoundBack>
                <S.nfContainer>
                    <S.main404>
                        <S.text1>4</S.text1>
                        <S.text2>0</S.text2>
                        <S.text3>4</S.text3>
                    </S.main404>
                    <S.notText>Not Found</S.notText>
                    <S.pageText>페이지를 찾을 수 없습니다</S.pageText>
                </S.nfContainer>
            </S.notFoundBack>
            <Footer />
        </div>
    );
};

export default NotFound;
