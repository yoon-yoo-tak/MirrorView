import Sidebar from "../Sidebar";

const EssayCreate = () => {
    return (
        <div>
            <Sidebar />
            <div className="essayCreateWrap">
                <div>자기소개서 작성하기</div>
                <button>작성하기</button>
                <div className="essayCreateBox">
                    <input></input>
                    <div className="essayCreateContent"></div>
                </div>
            </div>
        </div>
    );
};

export default EssayCreate;
