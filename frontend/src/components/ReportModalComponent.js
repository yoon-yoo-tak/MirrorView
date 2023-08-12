import * as S from "./otherStyledComponents";
import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";

const ReportModalComponent = ({ member, openReport, closeReport }) => {
    const [reportContent, setReportContent] = useState("");

    const handleInput = (e) => {
        setReportContent(e.target.value);
    };

    const acceptReport = async () => {
        if (reportContent === "") {
            alert("신고 사유를 입력하세요.");
            return;
        }
        if (
            window.confirm(
                `${member.nickname}님을 정말 신고하시겠습니까? 취소는 안돼용`
            )
        ) {
            await axios
                .post("api/users/report", {
                    content: reportContent,
                    otherUserId: member.userId,
                })
                .then((res) => {
                    alert("신고가 접수되었습니다.");
                    console.log(res);
                    console.log(reportContent);
                    closeReport();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <S.modal value="report">
            <S.reportTitle>신고 대상 : {member.nickname}</S.reportTitle>
            <S.reportTitleText>
                신고 사유를 구체적으로 입력해주세요
            </S.reportTitleText>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                onChange={handleInput}
                placeholder=" 무분별한 신고는 제재 대상이 될 수 있습니다."
                fullWidth
                InputProps={{
                    style: {
                        fontFamily: "HakgyoansimWoojuR",
                        fontSize: "16px",
                        padding: "10px 0",
                    },
                }}
            />
            <S.reportBtnTap>
                <S.reportBtn onClick={closeReport}>닫기</S.reportBtn>
                <S.reportBtn onClick={acceptReport}>신고하기</S.reportBtn>
            </S.reportBtnTap>
        </S.modal>
    );
};

export default ReportModalComponent;
