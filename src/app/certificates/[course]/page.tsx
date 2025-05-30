'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { useUserStore } from '@/store/userStore';

export default function CertificatesPage() {
    const router = useRouter();
    const params = useParams();
    const certificateRef = useRef<HTMLDivElement>(null);
    const courseId = params['course'] as string;

    const courseNameMap: Record<string, string> = {
        opioid: 'Opioid Prevention',
        // Add more mappings when we add more courses
    };

    const courseName = (
        courseNameMap[courseId] || 'Unknown Course'
    ).toUpperCase();

    const user = useUserStore((state) => state.user);
    const nameplate =
        user && 'profile' in user ? user.profile.nameplate.toUpperCase() : '';

    const handleReturn = () => {
        router.push('/');
    };

    const handleDownload = async () => {
        if (certificateRef.current) {
            try {
                const dataUrl = await toPng(certificateRef.current, {
                    cacheBust: true,
                    pixelRatio: 2, // optional: increases resolution
                });
                const link = document.createElement('a');
                link.download = `certificate_${nameplate}_${courseName}.png`;
                link.href = dataUrl;
                link.click();
            } catch (err) {
                console.error('Failed to generate image', err);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#050814]">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/certificate-background.svg"
                    alt="Space Background"
                    fill
                    priority
                    className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-[#050814] opacity-40"></div>
            </div>

            <div className="fixed top-16 right-0 z-10">
                <div className="bg-[#FFFFFF]/75 backdrop-blur-sm rounded-l-lg pl-6 pr-4 py-4 flex items-center">
                    <Image
                        src="/kibble.png"
                        width={48}
                        height={32}
                        alt="fish"
                        className="mr-2"
                    />
                    <span className="text-black">+ 100 Fish</span>
                </div>
            </div>

            {/* Content */}
            <div className="z-10 flex flex-col items-center px-4 py-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    CONGRATULATIONS
                </h1>

                <p className="text-white text-center mb-6">
                    You have completed this course!
                    <br />
                    You have received:
                </p>

                <div className="w-full max-w-2xl mx-auto">
                    <div
                        ref={certificateRef}
                        className="relative bg-white rounded-lg overflow-hidden"
                        style={{
                            boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        <Image
                            src="/certificate.png"
                            width={800}
                            height={600}
                            alt="Certificate"
                            className="w-full h-auto"
                        />

                        <div className="absolute top-[36%] left-0 right-0 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                {courseName}
                            </h2>
                        </div>

                        <div className="absolute top-[55%] left-0 right-0 text-center">
                            <div className="text-3xl md:text-4xl font-bold">
                                {nameplate}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={handleDownload}
                        className="bg-[#050814] bg-opacity-50 border border-white text-white py-3 px-10 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-opacity-70 hover:border-white hover:scale-105 hover:shadow-glow transition-all duration-300"
                    >
                        DOWNLOAD
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={handleReturn}
                        className="bg-[#050814] bg-opacity-50 border border-white text-white py-3 px-10 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-opacity-70 hover:border-white hover:scale-105 hover:shadow-glow transition-all duration-300"
                    >
                        RETURN TO HOME
                    </button>
                </div>
            </div>
        </div>
    );
}
