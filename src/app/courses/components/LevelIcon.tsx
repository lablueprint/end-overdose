import React from 'react';
import { useRouter } from 'next/navigation'; // or 'next/router' if using pages directory
import styles from './LevelIcon.module.css';

interface LevelIconProps {
    type: 'completed' | 'current';
    top: string;
    left: string;
    href?: string; // Optional because only 'current' icons will navigate
}

const LevelIcon: React.FC<LevelIconProps> = ({ type, top, left, href }) => {
    const router = useRouter();

    const style: React.CSSProperties = {
        position: 'absolute',
        top,
        left,
        cursor: type === 'current' ? 'pointer' : 'default',
    };

    const className = `${styles.levelIcon} ${type === 'current' ? styles.pulse : ''}`;

    const handleClick = () => {
        if (type === 'current' && href) {
            router.push(href);
        }
    };

    return (
        <div
            className={className}
            style={style}
            onClick={type === 'current' ? handleClick : undefined}
        >
            {type === 'completed' ? (
                <svg
                    width="68"
                    height="68"
                    viewBox="0 0 68 68"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g transform="translate(34, 34) scale(1.5) translate(-14.5, -14.5)">
                        <circle cx="14.5" cy="14.5" r="14.5" fill="#A9DECA" />
                        <path
                            d="M20.1393 11.6416L13.4626 18.3183L10.4277 15.2834"
                            stroke="#02B56B"
                            strokeWidth="1.21395"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
            ) : (
                <svg
                    width="68"
                    height="68"
                    viewBox="0 0 68 68"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g transform="translate(34, 34) scale(0.90625) translate(-34, -34)">
                        <circle cx="34" cy="34" r="24" fill="#FDD907" />
                        <circle
                            cx="34"
                            cy="34"
                            r="29"
                            stroke="white"
                            strokeOpacity="0.15"
                            strokeWidth="10"
                        />
                        <circle
                            cx="34.0002"
                            cy="34.0007"
                            r="14.6667"
                            fill="#EDA62A"
                        />
                        <path
                            d="M31.5557 29.1113L38.7948 33.7651L31.5557 38.4188V29.1113Z"
                            fill="white"
                            stroke="white"
                            strokeWidth="1.50174"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
            )}
        </div>
    );
};

export default LevelIcon;
