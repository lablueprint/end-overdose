'use client';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
export default function VideoPage({
    videoPath,
    setIsCompleted,
}: {
    videoPath: string;
    setIsCompleted: (value: boolean) => void;
}) {
    const videoRef = useRef<ReactPlayer | null>(null);
    const [thePlayed, setThePlayed] = useState(0);
    const [highestSecond, setHighestSecond] = useState(0);
    const [playing, setPlaying] = useState(false);

    return (
        <div className="flex flex-col">
            {/* video */}
            <div id="player-size">
                <div id="cropping-div">
                    <div id="div-to-crop">
                        <div id="player-wrapper">
                            <ReactPlayer
                                url={videoPath}
                                controls={false}
                                config={{
                                    youtube: { playerVars: { disablekb: 1 } },
                                }}
                                ref={videoRef}
                                onProgress={({ playedSeconds }) => {
                                    setThePlayed(playedSeconds);
                                    setHighestSecond((prev) => {
                                        if (playedSeconds > prev) {
                                            return playedSeconds;
                                        }
                                        return prev;
                                    });
                                }}
                                onEnded={() => {
                                    setIsCompleted(true);
                                }}
                                playing={playing}
                                onPlay={() => {
                                    setPlaying(true);
                                }}
                                width="90%"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-between items-center mt-4 w-[90%]">
                {/* slider */}
                <input
                    type="range"
                    value={thePlayed}
                    min="0"
                    max={videoRef.current?.getDuration() || 0}
                    onChange={(e) => {
                        setThePlayed((prev) => {
                            const currSeconds = parseInt(e.target.value);
                            if (
                                currSeconds > prev &&
                                currSeconds > highestSecond
                            ) {
                                return prev;
                            }
                            videoRef.current?.seekTo(currSeconds);
                            setPlaying(true);
                            return currSeconds;
                        });
                    }}
                    className="w-[88%]"
                />

                {/* display time */}
                <div>
                    {Math.floor(thePlayed / 60)}:
                    {('0' + Math.floor(thePlayed % 60)).slice(-2)} /
                    {Math.floor((videoRef.current?.getDuration() || 0) / 60)}:
                    {(
                        '0' +
                        Math.floor((videoRef.current?.getDuration() || 0) % 60)
                    ).slice(-2)}
                </div>
            </div>
        </div>
    );
}
