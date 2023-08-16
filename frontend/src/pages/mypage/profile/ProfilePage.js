import { useNavigate } from "react-router-dom";
import Sidebar from "../MypageSidebarPage";
import StarRating from "../../../components/mypage/StarRatingComponent";
import { user } from "../../../store/AuthStore";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import * as S from "../../../components/mypage/MypageStyledComponents";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import axios from "axios";

import defaultImage from "../../../assets/defaultimage.png";
import ImageCrop from "components/mypage/ImageCropComponent";
import { setPhoto } from "../../../store/AuthStore";
import { AddAlertRounded } from "@material-ui/icons";
// import getCroppedImg from "components/mypage/GetCrop";

const Profile = () => {
    // const id = useSelector((state) => state.auth.id);
    // const nickname = useSelector((state) => state.auth.nickname);
    // const email = useSelector((state) => state.auth.email);
    // user 자체를 가져오게 되면 state.auth.user
    // 대신 user가 자체적으로 정보를 가지고 있어야 함

    const { user } = useSelector((state) => state.auth);

    // ---- 임의 사용자 생성 ----

    // const [user, setUser] = useState({
    //     userId: "123",
    //     nickname: "뀨",
    //     email: "ssafy@ssafy",
    //     averageRating: 3.4,
    //     password: "123",
    //     photo: `${defaultImage}`,
    // });

    // ------------------------

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ChangeNickname = (e) => {
        e.preventDefault();
        navigate("/mypage/changenickname");
    };

    const ChangeEmail = (e) => {
        e.preventDefault();
        navigate("/mypage/changeemail");
    };

    const hidden = {
        visibility: "hidden",
    };

    const font = {
        fontFamily: "HakgyoansimWoojuR",
    };
    const [imageUrl, setImageUrl] = useState("");
    const [cropModal, setCropModal] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const [croppedImage, setCroppedImage] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleModalClose = () => {
        setCropModal(false);
    };

    // 이미지 설정 메뉴 관련
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // 이미지 설정 메뉴 닫기
    const handleClose = () => {
        setAnchorEl(null);
    };

    // 메뉴 클릭했을때 input 파일 업로더 실행시키기
    const fileRef = useRef(null);
    const handleInput = () => {
        // handleClose();
        fileRef.current.click();
    };

    // 이미지 설정하기
    const updateNewImage = (e) => {
        const reader = new FileReader();
        if (!e.target.files) {
            return;
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            setCropModal(true);
            handleClose();
            // 이미지를 선택했으면 ? 사이즈 조정 이거 가능하냐?
        }
        // console.log("이미지 업로드");
    };

    const handleSetImage = async (croppedImageUrl) => {
        setImageUrl(croppedImageUrl);
        handleModalClose();

        // 이미지 URL에서 Blob 데이터를 가져와서 FormData에 추가
        const response = await fetch(croppedImageUrl);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append("multipartFile", blob, "profile.jpg"); // 파일 이름은 필요에 따라 변경할 수 있습니다.

        try {
            const serverResponse = await axios.post("/api/s3/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(setPhoto(croppedImageUrl));

            // 서버로부터 반환된 새로운 이미지 URL을 사용하여 상태를 업데이트
            if (serverResponse.data && serverResponse.data.fileName) {
                const newImageUrl = serverResponse.data.fileName; // 혹은 적절한 경로를 추가하여 완전한 URL을 만듭니다.
                // dispatch(setPhoto(newImageUrl));
                //console.log("등록해ㅠ");
            }
        } catch (error) {
            //console.error("Error uploading the image:", error);
        }
    };

    // 기본 이미지로 돌려놓기
    const setDefaultImage = async () => {
        if (window.confirm("기본 이미지로 설정하시겠습니까?")) {
            const response = await fetch(defaultImage);
            const blob = await response.blob();

            const formData = new FormData();
            formData.append("multipartFile", blob, "profile.jpg"); // 파일 이름은 필요에 따라 변경할 수 있습니다.

            try {
                const serverResponse = await axios.get(
                    "/api/s3/defaultimage",
                    // formData,
                    // {
                    //     headers: {
                    //         "Content-Type": "multipart/form-data",
                    //     },
                    // }
                );
                dispatch(setPhoto(defaultImage));

                // 서버로부터 반환된 새로운 이미지 URL을 사용하여 상태를 업데이트
                if (serverResponse.data && serverResponse.data.fileName) {
                    const newImageUrl = serverResponse.data.fileName; // 혹은 적절한 경로를 추가하여 완전한 URL을 만듭니다.
                    // dispatch(setPhoto(newImageUrl));
                    //console.log("등록해ㅠ");
                }
            } catch (error) {
                //console.error("Error uploading the image:", error);
            }
            handleClose();
        }
    };

    const goWithdrawal = () => {
        if (window.confirm("탈퇴하시겠습니까?")) {
            if (window.confirm("정말요?")) {
                if (window.confirm("진짜로?ㅠㅠ")) {
                    alert("안녕히가세여ㅠㅠㅠ");
                    axios
                        .delete(`api/users/${user.userId}`)
                        .then(() => {
                            // dispatch() 머해야대지??????!!!?
                            alert("회원 탈퇴 완료");
                            navigate("/");
                        })
                        .catch((error) => {
                            //console.log(error);
                            alert("회원탈퇴 실패 ㄷㄷ");
                        });
                }
            }
        }
    };

    const imageStyle = {
        width: "160px",
        height: "160px",
        filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4))",
        position: "relatice",
        borderRadius: "50%",
    };

    const rate = user.averageRating.toFixed(2);

    return (
        <div>
            <S.page>
                <Sidebar menu="profile" />
                <S.wrap>
                    <S.profileBox>
                        <h2>{user.nickname}님 반갑습니다!</h2>
                        <hr />
                        <S.profileInfo>
                            {/* <S.profileImageWrap> */}
                            {cropModal && (
                                <ImageCrop
                                    onSetImage={handleSetImage}
                                    setCropModal={handleModalClose}
                                    imageSrc={imageSrc}
                                    setCroppedImage={setCroppedImage}
                                    croppedAreaPixels={croppedAreaPixels}
                                    setCroppedAreaPixels={setCroppedAreaPixels}
                                />
                            )}
                            <S.profileImage>
                                <img
                                    src={user.photo}
                                    alt="profileImage"
                                    style={imageStyle}
                                />

                                <S.Button
                                    value="image"
                                    id="demo-positioned-button"
                                    aria-controls={
                                        open
                                            ? "demo-positioned-menu"
                                            : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                />

                                <div>
                                    <Menu
                                        id="demo-positioned-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            "aria-labelledby":
                                                "demo-positioned-menu",
                                        }}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "left",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "left",
                                        }}
                                    >
                                        <MenuItem
                                            onClick={handleInput}
                                            style={font}
                                        >
                                            이미지 등록하기
                                            <input
                                                type="file"
                                                style={{ display: "none" }}
                                                ref={fileRef}
                                                accept="image/*"
                                                onChange={updateNewImage}
                                            />
                                        </MenuItem>
                                        <MenuItem
                                            onClick={setDefaultImage}
                                            style={font}
                                        >
                                            기본 이미지로 설정하기
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </S.profileImage>
                            {/* </S.profileImageWrap> */}
                            <S.profileKey>
                                <S.profileContent>ID</S.profileContent>
                                <S.profileContent>EMAIL</S.profileContent>
                                <S.profileContent>닉네임</S.profileContent>
                            </S.profileKey>
                            <S.vLine></S.vLine>
                            <S.profileDetail>
                                <S.profileContent>
                                    {user.userId}
                                </S.profileContent>
                                <S.profileContent>
                                    {user.email}
                                </S.profileContent>
                                <S.profileContent>
                                    {user.nickname}
                                </S.profileContent>
                            </S.profileDetail>
                            <S.profileUpdate>
                                <S.profileContent style={hidden}>
                                    숨김
                                </S.profileContent>
                                <S.profileContent onClick={ChangeEmail}>
                                    {/* <button variant="outlined">email 변경</button> */}
                                    <S.Button />
                                </S.profileContent>
                                <S.profileContent onClick={ChangeNickname}>
                                    <S.Button />
                                </S.profileContent>
                            </S.profileUpdate>
                        </S.profileInfo>
                        <br />
                        <h2>{user.nickname}님의 현재 평점</h2>
                        <hr />
                        <S.gradeGroup>
                            {/* <S.grade>{user.averageRating}</S.grade> */}
                            <S.grade>{rate}</S.grade>
                            <S.gradeStar>
                                <StarRating grade={user.averageRating} />
                            </S.gradeStar>
                        </S.gradeGroup>
                        <S.withdrawal onClick={goWithdrawal}>
                            회원탈퇴
                        </S.withdrawal>
                    </S.profileBox>
                </S.wrap>
            </S.page>
        </div>
    );
};

export default Profile;
