'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import ThemeCard from './ThemeCard';
import styles from './NarcatShop.module.css';
import { purchaseTheme, getStudentFromID2 } from '@/app/api/students/actions';

const THEMES = [
    {
        key: 'space',
        name: 'Captain Spacepaws',
        description:
            'With a jetpack made of tuna cans and a helmet he definitely stole from NASA, he zips through wormholes chasing laser pointers across galaxies. With him, no mission is too dangerous... unless it interrupts nap time.',
        catImage: '/cats/space.png',
        backgroundImage: '/backgrounds/space-thumbnail.png',
        previewBackground: '/backgrounds/space.png',
    },
    {
        key: 'cowboy',
        name: 'Cowboy Cat-ter',
        description:
            'This ain’t your average alley cat — he’s the rootin’-tootin’est wrangler west of the litter box. With spurs on his booties and a ten-gallon hat two sizes too big, he rides into town on a robotic Roomba, paws twitchin’ for justice.',
        catImage: '/cats/cowboy.png',
        backgroundImage: '/backgrounds/cowboy-thumbnail.png',
        previewBackground: '/backgrounds/cowboy.png',
    },
    {
        key: 'glinda',
        name: 'Glinda the Good Cat',
        description:
            'Glinda floats in on a bubble made of glitter and tuna-scented dreams. With a wand made from a bedazzled chopstick and wings she definitely didn’t borrow from the dog’s Halloween costume.',
        catImage: '/cats/glinda.png',
        backgroundImage: '/backgrounds/glinda-thumbnail.png',
        previewBackground: '/backgrounds/glinda.png',
    },
];

export default function NarcatShop() {
    const user = useUserStore((state) => state.user);
    const [selected, setSelected] = useState(THEMES[0]);
    const [fishCount, setFishCount] = useState<number | null>(null);
    const [unlocked, setUnlocked] = useState<string[]>([]);

    useEffect(() => {
        const fetchFish = async () => {
            if (user && 'student_id' in user) {
                const result = await getStudentFromID2(user.student_id);
                if (result && !('error' in result)) {
                    setFishCount(result.fish_count);
                    setUnlocked(result.profile?.unlocked ?? []);
                }
            }
        };
        fetchFish();
    }, [user]);

    const handlePurchase = async () => {
        if (!user || !('student_id' in user)) return;

        const result = await purchaseTheme(user.student_id, selected.key);

        if ('error' in result) {
            alert(result.error);
        } else {
            setFishCount(result.newFish);
            setUnlocked(result.newUnlocked);
            alert('Purchase successful!');
        }
    };

    return (
        <div className="h-full max-h-screen overflow-auto pb-8">
            {/* Fish counter in top right, above everything */}
            <div
                style={{
                    position: 'fixed',
                    top: '2rem',
                    right: '3rem',
                    zIndex: 1000,
                }}
            >
                <p
                    className={styles.fishCounter}
                    style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}
                >
                    <img
                        src="/kibble.png"
                        alt="Fish"
                        style={{
                            height: '1em',
                            verticalAlign: 'middle',
                            marginRight: '6px',
                            display: 'inline-block',
                        }}
                    />
                    <span
                        style={{
                            display: 'inline-block',
                            verticalAlign: 'middle',
                        }}
                    >
                        {fishCount ?? 'Loading...'}
                    </span>
                </p>
            </div>
            <div style={{ position: 'relative', width: '100%' }}>
                <div className={styles.shopGrid}>
                    <div className={styles.themeList}>
                        {THEMES.map((theme) => (
                            <ThemeCard
                                key={theme.key}
                                theme={theme}
                                isSelected={selected.key === theme.key}
                                onSelect={() => setSelected(theme)}
                            />
                        ))}
                    </div>
                    <div
                        className={styles.previewPanel}
                        style={{ position: 'relative' }}
                    >
                        <div className={styles.previewImageWrapper}>
                            <img
                                src={selected.previewBackground}
                                alt="Theme background"
                                className={styles.previewBackground}
                            />
                            <img
                                src={selected.catImage}
                                alt="Theme cat"
                                className={styles.previewCat}
                            />
                        </div>
                        {/* Price and purchase button row */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1.2rem',
                                marginTop: '1.5rem',
                                height: '3rem',
                            }}
                        >
                            {!unlocked.includes(selected.key) && (
                                <span
                                    className={styles.fishPrice}
                                    style={{
                                        fontSize: '1.1rem',
                                        padding: '0.5rem 1.2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '2.5rem',
                                    }}
                                >
                                    <img
                                        src="/kibble.png"
                                        alt="Fish"
                                        style={{
                                            height: '1.5em',
                                            verticalAlign: 'middle',
                                            marginRight: '6px',
                                            display: 'inline-block',
                                        }}
                                    />
                                    25
                                </span>
                            )}
                            <button
                                onClick={handlePurchase}
                                disabled={unlocked.includes(selected.key)}
                                className={styles.purchaseButton}
                                style={{
                                    height: '2.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '1.1rem',
                                    padding: '0 2rem',
                                    marginTop: '-0.2rem',
                                }}
                            >
                                {unlocked.includes(selected.key)
                                    ? 'Owned'
                                    : 'Purchase'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
