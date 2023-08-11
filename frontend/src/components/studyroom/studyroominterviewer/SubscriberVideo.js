import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

export const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    // width: 313px;
    // height: 170px;
    border-radius: 10px;
`;

const SubscriberVideo = ({ subscriber }) => {
    const subscriberVideoRef = React.createRef();
    const [visiableLabel, setVisiableLabel] = useState(false);

    useEffect(() => {
        componentDidUpdate();
        componentDidMount();
    }, [subscriber]);

    const componentDidUpdate = () => {
        if (subscriber && !!subscriberVideoRef) {
            subscriber.addVideoElement(subscriberVideoRef.current);
        }
    };

    const componentDidMount = () => {
        if (subscriber && !!subscriberVideoRef) {
            subscriber.addVideoElement(subscriberVideoRef.current);
        }
    };

    return (
        <>
            <StyledVideo
                ref={subscriberVideoRef}
                autoPlay={true}
                // className={JSON.parse(subscriber.stream.connection.data).clientData}
            ></StyledVideo>
            {visiableLabel && (
                <>
                    {/* username= {JSON.parse(subscriber.stream.connection.data).clientData} */}
                </>
            )}
        </>
    );
};
export default SubscriberVideo;
