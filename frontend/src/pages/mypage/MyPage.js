import { Route, Routes } from "react-router-dom";

import ChangePassword from "./ChangePassword";
import Feedback from "./feedback/Feedback";
import MyEssay from "./essay/MyEssay";
import EssayCreate from "./essay/EssayCreate";
import EssayDetail from "./essay/EssayDetail";
import Profile from "./profile/Profile";
import ChangeEmail from "./profile/ChangeEmail";
import ChangeNickname from "./profile/ChangeNickname";

const MyPage = () => {
    return (
        <div>
            <Routes>
                <Route path="changepassword" element={<ChangePassword />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="profile" element={<Profile />} />
                <Route path="changeemail" element={<ChangeEmail />} />
                <Route path="changenickname" element={<ChangeNickname />} />
                <Route path="myessay" element={<MyEssay />} />
                <Route path="essaycreate" element={<EssayCreate />} />
                <Route path="essaydetail/:id" element={<EssayDetail />} />
                <Route path="changepassword" element={<ChangePassword />} />
            </Routes>
        </div>
    );
};

export default MyPage;
