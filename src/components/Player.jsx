/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import VideoPlayer from "./VideoPlayer";
import { useApi } from "../services/useApi";
import Skeleton from "./Skeleton";

const Player = ({
  episodeId,
  currentEp,
  changeEpisode,
  hasNextEp,
  hasPrevEp,
}) => {
  const [category, setCategory] = useState("sub");
  const [server, setServer] = useState("HD-1");

  const { data, isLoading, isError, error } = useApi(
    `/stream?id=${episodeId}&server=${server}&type=${category}`
  );

  const streamLink = data?.link?.file;
  const subtitles = data?.tracks?.filter((t) => t.kind === "captions");

  const changeCategory = (newType) => {
    if (newType !== category) {
      setCategory(newType);
    }
  };
  function changeServer(newServer) {
    if (newServer !== server) setServer(newServer);
  }

  return (
    <>
      <div className="w-full bg-background aspect-video relative rounded-sm  max-w-screen-xl overflow-hidden">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : isError ? (
          <div className="w-full h-full flex items-center justify-center bg-black text-white">
            <p>Error loading stream: {error?.message || "Unknown error"}</p>
          </div>
        ) : (
          <VideoPlayer
            option={{
              url: streamLink,
              subtitle: {
                url: subtitles?.find(s => s.label === "English")?.file || "",
                type: 'vtt',
                style: {
                  color: '#ffffff',
                  fontSize: '20px',
                },
                encoding: 'utf-8',
              },
              poster: data?.poster || "", // Add poster if available in stream data or pass from props
              autoplay: true,
              isLive: false,
              muted: false,
              autoSize: true,
              autoMini: true,
              screenshot: true,
              setting: true,
              loop: false,
              flip: true,
              playbackRate: true,
              aspectRatio: true,
              fullscreen: true,
              fullscreenWeb: true,
              subtitleOffset: true,
              miniProgressBar: true,
              mutex: true,
              backdrop: true,
              playsInline: true,
              autoPlayback: true,
              airplay: true,
              theme: "#FDB600", // Gold/Primary color
              lang: navigator.language.toLowerCase(),

            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>
      <div className="category flex flex-wrap flex-col sm:flex-row items-center justify-center  sm:justify-between px-2 md:px-20 gap-3 bg-lightbg py-2">
        <div className="servers flex gap-4">
          <button
            onClick={() => changeServer("HD-1")}
            className={`${server === "HD-1"
                ? "bg-primary text-black"
                : "bg-btnbg  text-white"
              } px-2 py-1 rounded text-sm font-semibold`}
          >
            HD-1
          </button>
          <button
            onClick={() => changeServer("HD-2")}
            className={`${server === "HD-2"
                ? "bg-primary text-black"
                : "bg-btnbg  text-white"
              } px-2 py-1 rounded text-sm font-semibold`}
          >
            HD-2
          </button>
        </div>
        <div className="flex gap-5">
          <div className="sound flex gap-3">
            {["sub", "dub"].map((type) => (
              <button
                key={type}
                onClick={() => changeCategory(type)}
                className={`${category === type
                    ? "bg-primary text-black"
                    : "bg-btnbg  text-white"
                  } px-2 py-1 rounded text-sm font-semibold`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="btns flex gap-4">
            {hasPrevEp && (
              <button
                title="prev"
                className="prev bg-primary px-2 py-1 rounded-md text-black"
                onClick={() => changeEpisode("prev")}
              >
                <TbPlayerTrackPrevFilled />
              </button>
            )}
            {hasNextEp && (
              <button
                title="next"
                className="next bg-primary px-2 py-1 rounded-md text-black"
                onClick={() => changeEpisode("next")}
              >
                <TbPlayerTrackNextFilled />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-400">
            you are watching Episode {currentEp.episodeNumber}
          </p>
          {currentEp.isFiller && (
            <p className="text-red-400">your are watching filler Episode 👻</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
