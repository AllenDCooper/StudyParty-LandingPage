import React, { useState } from "react";

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

  const imageStyle = {
    position: "fixed",
    top: "0",
    right: "-250px",
    height: "100%",
    // width: "100%",
    zIndex: -1,
  }

  // const getVideoSrc = width => {
  //   if (width >= 1080) return `${process.env.PUBLIC_URL}/assets/background_video_cropped_mirror.mp4`;
  //   if (width >= 720) return `${process.env.PUBLIC_URL}/assets/background_video_cropped_mirror.mp4`;
  //   return `${process.env.PUBLIC_URL}/assets/background_video_cropped_mirror_mobile.mp4`;
  // };

  // const src = getVideoSrc(window.innerWidth);

  const isMobile = (width) => {
    if (width >= 720) { return false }
    return true
  }

  return (
    <>
      {isMobile(window.innerWidth) ?
        <img
          src={`${process.env.PUBLIC_URL}/assets/video_screenshot.jpg`}
          className="video-thumb tiny"
          alt="thumb"
          style={imageStyle}
        />
        :

        <video
          src={`${process.env.PUBLIC_URL}/assets/background_video_cropped_mirror.mp4`}
          type={"video/mp4"}
          autoPlay={true}
          loop={true}
          style={style}
          muted={true}
        >
        </video>
      }
    </>
  );
}

export default Video;