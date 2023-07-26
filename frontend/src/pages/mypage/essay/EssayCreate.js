import Sidebar from "../Sidebar";
import classes from "./EssayCreate.module.scss";

const EssayCreate = () => {
    return (
        <div>
            <div className={classes.essayCreatePage}>
                <Sidebar />
                <div className={classes.essayCreateWrap}>
                    <div>자기소개서 작성하기</div>
                    <button>작성하기</button>
                    <div className={classes.essayCreateBox}>
                        <div className={classes.essayTitle}>
                            <input />
                        </div>
                        <div className={classes.essayContentBox}>
                            <input />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EssayCreate;
