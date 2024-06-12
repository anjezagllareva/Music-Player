import React, { useEffect, useState } from "react";
import { BaseTexture, Texture, VideoResource } from "@pixi/core";
import { Stage, Sprite } from "@pixi/react";
import videoSrc from "../../video/The-Power-of-Music-Videos.mp4";
import "./VideoPage.scss";

const VideoPage = () => {
  const [dimensions, setDimensions] = useState({
    width: 900,
    height: 600,
  });

  const [videoTexture, setVideoTexture] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: 900,
        height: 600,
      });
    };

    window.addEventListener("resize", handleResize);
    const videoResource = new VideoResource(videoSrc, {
      autoPlay: true,
      loop: true,
      muted: true,
    });

    const baseTexture = new BaseTexture(videoResource);

    const texture = new Texture(baseTexture);

    setVideoTexture(texture);

    return () => {
      window.removeEventListener("resize", handleResize);
      texture.destroy(true);
    };
  }, []);

  if (!videoTexture) return null;

  return (
    <div className="video-page">
      <div className="background-dots">
        {[...Array(50)].map((_, index) => (
          <div
            className="dot"
            key={index}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10}px`,
              height: `${Math.random() * 10}px`,
              animationDuration: `${Math.random() * 5 + 2}s`,
            }}
          />
        ))}
      </div>
      <h1 className="title">The Power of Music</h1>
      <Stage width={dimensions.width} height={dimensions.height}>
        <Sprite
          texture={videoTexture}
          width={dimensions.width}
          height={dimensions.height}
        />
      </Stage>
    </div>
  );
};

export default VideoPage;
