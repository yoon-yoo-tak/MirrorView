import { Route, Routes } from "react-router-dom";

import ChangePassword from "./ChangePasswordPage";
import Feedback from "./feedback/FeedbackPage";
import MyEssay from "./essay/EssayListPage";
import EssayCreate from "./essay/EssayCreatePage";
import EssayDetail from "./essay/EssayDetailPage";
import EssayUpdate from "./essay/EssayUpdatePage";
import Profile from "./profile/ProfilePage";
import ChangeEmail from "./profile/ChangeEmailPage";
import ChangeNickname from "./profile/ChangeNicknamePage";

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
                <Route
                    path="essaydetail/:id/update"
                    element={<EssayUpdate />}
                />
                <Route path="changepassword" element={<ChangePassword />} />
            </Routes>
        </div>
    );
};

export default MyPage;
