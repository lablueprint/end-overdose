'use client';

import styles from './NarcatShop.module.css';

interface ThemeCardProps {
    theme: {
        key: string;
        name: string;
        description: string;
        catImage: string;
        backgroundImage: string;
    };
    isSelected: boolean;
    onSelect: () => void;
}

export default function ThemeCard({
    theme,
    isSelected,
    onSelect,
}: ThemeCardProps) {
    return (
        <div
            className={`${styles.themeCard} ${isSelected ? styles.selectedCard : ''}`}
            onClick={onSelect}
            style={{ position: 'relative' }}
        >
            <span
                className={styles.fishPrice}
                style={{
                    position: 'absolute',
                    top: '1.2rem',
                    right: '1.5rem',
                    zIndex: 2,
                }}
            >
                <img
                    src="/kibble.png"
                    alt="Fish"
                    style={{
                        height: '1.2em',
                        verticalAlign: 'middle',
                        marginRight: '4px',
                        display: 'inline-block',
                    }}
                />{' '}
                25
            </span>
            {/* Image area with background and cat layered */}
            <div className={styles.cardImageWrapper}>
                <img
                    src={theme.backgroundImage}
                    alt="Theme background"
                    className={styles.cardBackground}
                />
                <img
                    src={theme.catImage}
                    alt="Theme cat"
                    className={styles.cardCat}
                />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <h3>{theme.name.toUpperCase()}</h3>
                </div>
                <p className={styles.cardDescription}>{theme.description}</p>
            </div>
        </div>
    );
}
