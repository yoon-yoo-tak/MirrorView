const StarRating = (props) => {
    const percent = props.grade * 20;

    const rating = {
        unicodeBidi: "bidi-override",
        color: "#D4D4D4",
        fontSize: "40px",
        // height: "50px",
        // width: "250px",
        margin: "25px 0 0 20px",
        position: "relative",
        padding: "0",
        textShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
    };
    const rating_upper = {
        color: "#AC93F3",
        padding: "0",
        position: "absolute",
        zIndex: "1",
        display: "flex",
        top: "0",
        left: "0",
        width: `${percent}%`,
        overflow: "hidden",
    };

    const rating_lower = {
        padding: "0",
        display: "flex",
        zIndex: "0",
    };

    return (
        <div>
            <div style={rating}>
                <div style={rating_upper}>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                </div>
                <div style={rating_lower}>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                </div>
            </div>
        </div>
    );
};

export default StarRating;
