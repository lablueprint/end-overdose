'use client';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';
function CustomPlayer({ videoPath }) {
    return (
        <ReactPlayer
            url={videoPath}
            controls={false}
            config={{
                file: {
                    attributes: { controlsList: 'nodownload noplaybackrate' },
                },
            }}
            onSeek={() => console.log('Seeking is disabled!')}
            onProgress={(progress) => {
                console.log(progress.played);
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
                    maxWidth: '800px',
                    maxHeight: '1000px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CustomPlayer videoPath={videoPath} />
            </div>
            <div style={{ cursor: 'pointer' }} onClick={handleNext}>
                Next Page
            </div>
        </div>
    );
}
