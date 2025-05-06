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
        >
            <img
                src={theme.backgroundImage}
                alt={`${theme.name} thumbnail`}
                className={styles.cardThumbnail}
            />
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <h3>{theme.name.toUpperCase()}</h3>
                    <span className={styles.fishPrice}>25 🐟</span>
                </div>
                <p className={styles.cardDescription}>{theme.description}</p>
            </div>
        </div>
    );
}
