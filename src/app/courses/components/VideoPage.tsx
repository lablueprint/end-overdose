'use client';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';
import { useState, useRef } from 'react';
function CustomPlayer({ videoPath, setIsCompleted }) {
    const videoRef = useRef<ReactPlayer>(null);
    const [thePlayed, setThePlayed] = useState(0);

    return (
        <ReactPlayer
            url={videoPath}
            controls={true}
            config={{
                file: {
                    attributes: { controlsList: 'nodownload noplaybackrate' },
                },
            }}
            ref={videoRef}
            // onProgress={({ playedSeconds }) => {
            //     setThePlayed(playedSeconds);
            //     console.log(thePlayed);
            //     //Update the played time only if within bounds
            //     if (playedSeconds <= thePlayed) {
            //         setThePlayed(playedSeconds); // Update the highest watched position
            //     } else if (videoRef.current) {
            //         videoRef.current.seekTo(thePlayed); // Prevent watching ahead
            //     }
            // }}
            onSeek={(seekedTime) => {
                // setThePlayed(seekedTime);
                console.log(seekedTime, 'seekedTime');
                if (seekedTime > thePlayed && videoRef.current) {
                    videoRef.current.seekTo(thePlayed); // Revert forward seeks
                }
            }}
            onEnded={() => {
                setIsCompleted(true);
                console.log('video ended');
            }}
        />
    );
}
interface videoPageProps {
    pageTitle: string;
    pageContent: string;
    pageModule: string; // module name/number
    pageCourse: string; // course name
    pagePath: string; // page number within module
    videoPath: string; // URL path for video
}

export default function VideoPage({
    pageTitle,
    pageContent,
    pageModule,
    pageCourse,
    pagePath,
    videoPath,
}: videoPageProps) {
    const router = useRouter();
    // not sure if this is necessary and/or is good code, lowkey just hardcoding a totalCoursePages for now for a next page link
    const totalCoursePages = 3;
    const [isCompleted, setIsCompleted] = useState(false);
    const handleNext = () => {
        if (parseInt(pagePath) + 1 !== totalCoursePages)
            router.push(
                `/courses/${pageCourse}/${pageModule}/${parseInt(pagePath) + 1}`
            );
    };
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
                    setIsCompleted={setIsCompleted}
                />
            </div>
            {isCompleted && (
                <div style={{ cursor: 'pointer' }} onClick={handleNext}>
                    Next Page
                </div>
            )}
        </div>
    );
}
