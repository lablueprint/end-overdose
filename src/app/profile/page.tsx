'use client';

import Badge from './components/Badge';
import { adjectives, nouns } from './data';
import RolePlate from './components/RolePlate';
import { useEffect, useState } from 'react';
import ConfirmButton from './components/ConfirmButton';
import ScrollableList from './components/ScrollableList';

export default function Home() {
    const [selectedIndex1, setSelectedIndex1] = useState(0);
    const [selectedIndex2, setSelectedIndex2] = useState(0);
    const [userRole, setUserRole] = useState('administrator');

    const [name, setName] = useState(
        adjectives[selectedIndex1].concat(' ', nouns[selectedIndex2])
    );
    const [changesMade, setChangeMade] = useState(false);

    const incrementIndex1 = () => {
        if (selectedIndex1 < adjectives.length - 1) {
            setSelectedIndex1(selectedIndex1 + 1);
        }
    };

    const incrementIndex2 = () => {
        if (selectedIndex2 < adjectives.length - 1) {
            setSelectedIndex2(selectedIndex2 + 1);
        }
    };

    const decrementIndex1 = () => {
        if (selectedIndex1 > 0) {
            setSelectedIndex1(selectedIndex1 - 1);
        }
    };

    const decrementIndex2 = () => {
        if (selectedIndex2 > 0) {
            setSelectedIndex2(selectedIndex2 - 1);
        }
    };

    useEffect(() => {
        setChangeMade(true);
        setName(adjectives[selectedIndex1].concat(' ', nouns[selectedIndex2]));
        const element1 = document //Selected element for List1
            .getElementsByClassName('selectedNamePlate')
            .item(0);
        const element2 = document //Selected element for List2
            .getElementsByClassName('selectedNamePlate')
            .item(1);

        element1?.scrollIntoView({
            behavior: 'instant',
            block: 'center',
        });

        element2?.scrollIntoView({
            behavior: 'instant',
            block: 'center',
        });
    }, [selectedIndex1, selectedIndex2]);

    return (
        <div>
            <title> End Overdose </title>
            <main>
                <div>
                    <h1 style={{ fontSize: 24, padding: '10px' }}> Profile </h1>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <h1 style={{ fontSize: 35 }}>{name}</h1>
                        <RolePlate role={userRole} />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'space-between',
                            padding: '20px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'space-between',
                            }}
                        >
                            <ScrollableList
                                names={adjectives}
                                selectedIndex={selectedIndex1}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <div style={{ padding: '5px', margin: '5px' }}>
                                    <button onClick={decrementIndex1}>+</button>
                                </div>
                                <div style={{ padding: '5px', margin: '5px' }}>
                                    <button onClick={incrementIndex1}>-</button>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'space-between',
                            }}
                        >
                            <ScrollableList
                                names={nouns}
                                selectedIndex={selectedIndex2}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <div style={{ padding: '5px', margin: '5px' }}>
                                    <button onClick={decrementIndex2}>+</button>
                                </div>
                                <div style={{ padding: '5px', margin: '5px' }}>
                                    <button onClick={incrementIndex2}>-</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ConfirmButton
                            changesMade={changesMade}
                            onPress={() => {
                                setChangeMade(false);
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '20px',
                        }}
                    >
                        <h1 style={{ fontSize: 24, marginBottom: '10px' }}>
                            {' '}
                            Badges{' '}
                        </h1>
                        <div className="badge-table">
                            <Badge
                                badgeImage="/badge.png"
                                badgeTitle="Badge 1"
                            />
                            <Badge
                                badgeImage="/badge.png"
                                badgeTitle="Badge 2"
                            />
                            <Badge
                                badgeImage="/badge.png"
                                badgeTitle="Badge 3"
                            />
                            <Badge
                                badgeImage="/badge.png"
                                badgeTitle="Badge 4"
                            />
                            <Badge
                                badgeImage="/badge.png"
                                badgeTitle="Badge 5"
                            />
                            <Badge
                                badgeImage="/badge.png"
                                badgeTitle="Badge 6"
                            />
                            <Badge
                                badgeImage="/badge.png"
                                badgeTitle="Badge 7"
                            />
                            <Badge
                                badgeImage="/badge.png"
                                badgeTitle="Badge 8"
                            />
                            <Badge
                                badgeImage="/badge.png"
                                badgeTitle="Badge 9"
                            />
                            <Badge
                                badgeImage="/badge.png"
                                badgeTitle="Badge 10"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export type WrapperProps = {
    mainApp: React.ElementType;
};
