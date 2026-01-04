
import { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";

const VideoPlayer = ({ option, style, getInstance, ...rest }) => {
    const artRef = useRef();

    useEffect(() => {
        const art = new Artplayer({
            ...option,
            container: artRef.current,
            customType: {
                m3u8: function (video, url) {
                    if (Hls.isSupported()) {
                        if (art.hls) art.hls.destroy();
                        const hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                        art.hls = hls;
                        art.on("destroy", () => hls.destroy());
                    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                        video.src = url;
                    } else {
                        art.notice.show = "Unsupported playback format: m3u8";
                    }
                },
            },
        });

        if (getInstance && typeof getInstance === "function") {
            getInstance(art);
        }

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, [option, getInstance]);

    return <div ref={artRef} style={style} {...rest}></div>;
};

export default VideoPlayer;
