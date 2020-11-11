import React from "react";

const Video = () => {

    const style = {
        left: "50%",
        top: "50%",
        width: "auto",
        height: "auto",
        position: "fixed",
        transform: "translate(-50%, -50%)",
        minWidth: "100%",
        minHeight: "100%",
        zIndex: -1,
    };

    return (
        <video
            src={`${process.env.PUBLIC_URL}/assets/background_video_cropped_mirror.mp4`}
            type={"video/mp4"}
            autoPlay={true}
            loop={true}
            style={style}
            muted={true}
        >
        </video>
    );
}

export default Video;