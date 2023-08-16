import Rating from "@mui/material/Rating";
import { useState } from "react";

const StarRatingInput = () => {
    const [ratingData, setRatingdata] = useState({
        nickname: "",
        rate: 0,
    });

    const handleRatingChange = (e, newValue) => {
        setRatingdata((prevData) => ({
            ...prevData,
            rate: newValue,
        }));
    };

    return (
        <div>
            <Rating
                name="star-rating"
                defaultValue={0}
                value={ratingData.rate}
                precision={0.5}
                size="large"
                onChange={handleRatingChange}
            />
        </div>
    );
};

export default StarRatingInput;
