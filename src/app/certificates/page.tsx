// app/certificates/page.tsx
'use client';

import Certificate from './Certificate';
import styles from './Certificate.module.css'; // reuse the same CSS module

export default function CertificatesPage() {
    const handleReturn = () => {
        window.location.href = '/'; // update if using router.push
    };

    return (
        <div className={styles.pageWrapper}>
            <h1 className={styles.congratsTitle}>CONGRATULATIONS!</h1>

            <p className={styles.congratsSubtext}>
                You have completed this course!
                <br />
                Along with this certificate, you have <br /> gained{' '}
                <span className={styles.highlight}>
                    100{' '}
                    <span className={styles.inlineKibble}>
                        <img
                            src="/kibble.png"
                            alt="kibble"
                            className={styles.kibbleImg}
                        />
                        !
                    </span>
                </span>
            </p>

            <Certificate courseName="Opioid Prevention Course" />

            <button onClick={handleReturn} className={styles.menuBtn}>
                RETURN TO MENU
            </button>
        </div>
    );
}
