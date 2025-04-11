// components/Certificate.tsx
'use client';

import { toPng } from 'html-to-image';
import { useRef } from 'react';
import { useUserStore } from '@/store/userStore';
import styles from './Certificate.module.css';

type Props = {
    courseName: string;
};

export default function Certificate({ courseName }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const user = useUserStore((state) => state.user);
    const name = user && 'nameplate' in user ? user.nameplate : '';

    const handleDownload = async () => {
        if (ref.current) {
            try {
                const dataUrl = await toPng(ref.current, {
                    cacheBust: true,
                    pixelRatio: 2, // optional: increases resolution
                });
                const link = document.createElement('a');
                link.download = `certificate_${name}_${courseName}.png`;
                link.href = dataUrl;
                link.click();
            } catch (err) {
                console.error('Failed to generate image', err);
            }
        }
    };

    return (
        <div className={styles.certificateContainer}>
            <div ref={ref}>
                <img
                    src="/certificate.png"
                    alt="Certificate"
                    className={styles.certificateImg}
                />
                <div className={styles.nameOverlay}>{name.toUpperCase()}</div>
                <div className={styles.courseOverlay}>
                    {courseName.toUpperCase()}
                </div>
            </div>
            <button onClick={handleDownload} className={styles.downloadBtn}>
                <img
                    src="/download.png"
                    alt="Download"
                    // className={styles.certificateImg}
                />
            </button>
        </div>
    );
}
