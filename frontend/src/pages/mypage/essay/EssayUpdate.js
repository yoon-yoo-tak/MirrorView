import classes from "./EssayUpdate.module.scss";
import Sidebar from "../Sidebar";

const EssayUpdate = () => {
    const essayUpdateComplete = () => {};
    return (
        <div>
            <div className={classes.essayDetailPage}>
                <Sidebar menu="essay" />
                <div className={classes.essayWrap}>
                    <div>자기소개서 수정하기</div>
                    <hr />
                    <button onClick={essayUpdateComplete}>수정하기</button>
                    <div className="essayBox"></div>
                </div>
            </div>
        </div>
    );
};

export default EssayUpdate;
