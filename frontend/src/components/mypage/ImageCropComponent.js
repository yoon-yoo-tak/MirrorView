import { useCallback, useState, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./GetCrop";
import * as S from "./MypageStyledComponents";

const ImageCrop = ({
    setCropModal,
    croppedImage,
    setCroppedImage,
    onSetImage,
    imageSrc,
    // setCropped,
    setCroppedAreaPixels,
    croppedAreaPixels,
    // width = "4",
    // height = "4",
    cropShape = "round",
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixel) => {
        setCroppedAreaPixels(croppedAreaPixel);
    }, []);

    const handleSaveImage = useCallback(async () => {
        try {
            const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);

            // console.log("donee", { croppedImage });
            onSetImage(cropped);
            // setCroppedImage(cropped);
            // handleSendCropped();
        } catch (e) {
            // console.error(e);
        }
    }, [imageSrc, croppedAreaPixels]);

    // const handleSendCropped = () => {
    //     onSetImage(croppedImage);
    // };

    // const handleSaveImage = useCallback(async () => {
    //     console.log(croppedImage);
    //     console.log(croppedAreaPixels);
    //     try {
    //         const cropped = await getCroppedImg(
    //             croppedImage,
    //             croppedAreaPixels
    //         );
    //         onSetImage(cropped);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }, [croppedImage, croppedAreaPixels]);

    // 모달 관련 항목

    const closeModal = () => {
        if (window.confirm("이미지 설정을 취소하시겠습니까?")) {
            setCropModal(false);
        }
    };

    const modalRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                if (window.confirm("이미지 설정을 취소하시겠습니까?")) {
                    setCropModal(false);
                }
            }
        };

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [setCropModal]);

    useEffect(() => {
        const updateModalPosition = () => {
            if (modalRef.current) {
                modalRef.current.style.marginTop = `0px`;
            }
        };

        window.addEventListener("resize", updateModalPosition);
        updateModalPosition();

        return () => {
            window.removeEventListener("resize", updateModalPosition);
        };
    }, []);

    const handleInsideClick = (event) => {
        event.stopPropagation();
    };

    return (
        <S.cropModal ref={modalRef} onClick={handleInsideClick}>
            <S.cropContainer>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape={cropShape}
                />
            </S.cropContainer>
            <S.buttonWrap>
                <S.updateImageButton
                    onClick={handleSaveImage}
                    variant="contained"
                >
                    이미지 저장
                </S.updateImageButton>
            </S.buttonWrap>
        </S.cropModal>
    );
};

export default ImageCrop;
