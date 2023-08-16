import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

export const StyledVideo = styled.video`
    width: 100%;
    height: ${(props) => (props.main ? "100%" : "80%")};
    // width: 313px;
    // height: 170px;
    // border-radius: 10px;
`;

const SubscriberVideo = ({ subscriber, main }) => {
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
                main={main}
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
