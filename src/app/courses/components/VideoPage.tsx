'use client';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';
import { useState, useRef, useEffect } from 'react';
// function CustomPlayer({ videoPath, setIsCompleted }) {
//     const videoRef = useRef<ReactPlayer>(null);
//     const [thePlayed, setThePlayed] = useState(0);

//     return (
//         <ReactPlayer
//             url={videoPath}
//             controls={0}
//             config={{
//                 file: {
//                     attributes: { controlsList: 'nodownload noplaybackrate' },
//                 },
//             }}
//             ref={videoRef}
//             // onProgress={({ playedSeconds }) => {
//             //     setThePlayed(playedSeconds);
//             //     console.log(thePlayed);
//             //     //Update the played time only if within bounds
//             //     if (playedSeconds <= thePlayed) {
//             //         setThePlayed(playedSeconds); // Update the highest watched position
//             //     } else if (videoRef.current) {
//             //         videoRef.current.seekTo(thePlayed); // Prevent watching ahead
//             //     }
//             // }}
//             onSeek={(seekedTime) => {
//                 // setThePlayed(seekedTime);
//                 console.log(seekedTime, 'seekedTime');
//                 if (seekedTime > thePlayed && videoRef.current) {
//                     videoRef.current.seekTo(thePlayed); // Revert forward seeks
//                 }
//             }}
//             onEnded={() => {
//                 setIsCompleted(true);
//                 console.log('video ended');
//             }}
//         />
//     );
// }

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

const CustomPlayer = ({
    videoPath,
    startTime,
    endTime,
}: {
    videoPath: string;
    startTime: string;
    endTime: string;
}) => {
    const playerRef = useRef(null);
    const [player, setPlayer] = useState<YT.Player | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    const minutesToSeconds = (time: string) => {
        const [minutes, seconds] = time.split(':').map(Number);
        return minutes * 60 + seconds;
    };

    const formatTime = (time: number) => {
        time = Math.round(time);
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const extractVideoId = (url: string) => {
        const match = url.match(
            /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        return match ? match[1] : null;
    };

    const initializePlayer = () => {
        const startSeconds = minutesToSeconds(startTime);
        const endSeconds = minutesToSeconds(endTime);
        const totalSeconds = endSeconds - startSeconds;

        const videoId = extractVideoId(videoPath);

        if (!videoId) {
            console.error('Invalid YouTube URL.');
            return;
        }

        const newPlayer = new window.YT.Player(playerRef.current, {
            width: 600,
            height: 400,
            videoId,
            playerVars: {
                controls: 0, // disable video controls
                disablekb: 1, // disable keyboard controls
                start: startSeconds,
                end: endSeconds,
            },
            events: {
                onReady: () => {
                    newPlayer.seekTo(startSeconds);
                    setDuration(totalSeconds);
                    setTotalTime(totalSeconds);
                },
                onStateChange: (event: YT.OnStateChangeEvent) => {
                    if (event.data === window.YT.PlayerState.ENDED) {
                        newPlayer.seekTo(startSeconds);
                    }
                },
            },
        });

        setPlayer(newPlayer);

        // Periodically update the progress
        const interval = setInterval(() => {
            if (newPlayer && newPlayer.getCurrentTime) {
                const currentTime = newPlayer.getCurrentTime() - startSeconds;
                setCurrentTime(currentTime);
            }
        }, 1000);

        return () => clearInterval(interval);
    };

    useEffect(() => {
        // Load YouTube iframe API
        if (!window.YT) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.onload = () =>
                (window.onYouTubeIframeAPIReady = initializePlayer);
            document.body.appendChild(script);
        } else {
            initializePlayer();
        }
    }, [videoPath]);

    return (
        <div>
            <div ref={playerRef}></div>
            <div>
                <button onClick={() => player && player.playVideo()}>
                    Play
                </button>
                <button onClick={() => player && player.pauseVideo()}>
                    Pause
                </button>
                <input
                    type="range"
                    value={currentTime}
                    min="0"
                    max={totalTime}
                    readOnly
                    style={{ width: 300 }}
                />
                <span>{formatTime(currentTime)}</span>
                <span> / {formatTime(duration)}</span>
            </div>
        </div>
    );
};

interface videoPageProps {
    pageTitle: string;
    pageContent: string;
    pageModule: string; // module name/number
    pageCourse: string; // course name
    videoPath: string; // URL path for video
    startTime: string;
    endTime: string;
}

export default function VideoPage({
    pageTitle,
    pageContent,
    pageModule,
    pageCourse,
    videoPath,
    startTime,
    endTime,
}: videoPageProps) {
    const router = useRouter();
    // not sure if this is necessary and/or is good code, lowkey just hardcoding a totalCoursePages for now for a next page link
    const totalCoursePages = 3;
    const [isCompleted, setIsCompleted] = useState(false);
    //const handleNext = () => {
    //if (parseInt(pagePath) + 1 !== totalCoursePages)
    //router.push(
    //`/courses/${pageCourse}/${pageModule}/`
    //);
    //};
    return (
        <div>
            <h1>Page {pageTitle}</h1>
            <p>{pageContent}</p>
            <div
                className="video-container"
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '200',
                }}
            >
                <CustomPlayer
                    videoPath={videoPath}
                    startTime={startTime}
                    endTime={endTime}
                    //setIsCompleted={setIsCompleted}
                />
            </div>
            {isCompleted && <div style={{ cursor: 'pointer' }}>Next Page</div>}
        </div>
    );
}
