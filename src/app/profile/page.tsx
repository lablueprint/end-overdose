'use client';

import Badge from './Components/Badge';
import NameTable from './Components/NameTable';
import { adjectives, nouns } from './data';
import RolePlate from './Components/RolePlate';
import { useEffect, useState } from 'react';
import ConfirmButton from './Components/ConfirmButton';

export default function Home() {
    const num1 = Math.floor(Math.random() * 99);
    const num2 = Math.floor(Math.random() * 99);

    const [selectedIndex1, setSelectedIndex1] = useState(
        0
        //num1
    );
    const [selectedIndex2, setSelectedIndex2] = useState(0); //num2);
    //0

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
        const element1 = document
            .getElementsByClassName('selectedNamePlate')
            .item(0);
        const element2 = document
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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <NameTable
                            table1Vals={adjectives}
                            table1Index={selectedIndex1}
                            table2Vals={nouns}
                            table2Index={selectedIndex2}
                        />
                        <button onClick={decrementIndex1}>Up1</button>
                        <button onClick={incrementIndex1}>Down1</button>
                        <button onClick={decrementIndex2}>Up2</button>
                        <button onClick={incrementIndex2}>Down2</button>
                    </div>
                    <div className="badge-table">
                        <Badge badgeImage="/badge.png" badgeTitle="Badge 1" />
                        <Badge badgeImage="/badge.png" badgeTitle="Badge 2" />
                        <Badge badgeImage="/badge.png" badgeTitle="Badge 3" />
                        <Badge badgeImage="/badge.png" badgeTitle="Badge 4" />
                        <Badge badgeImage="/badge.png" badgeTitle="Badge 5" />
                        <Badge badgeImage="/badge.png" badgeTitle="Badge 6" />
                        <Badge badgeImage="/badge.png" badgeTitle="Badge 7" />
                        <Badge badgeImage="/badge.png" badgeTitle="Badge 8" />
                        <Badge badgeImage="/badge.png" badgeTitle="Badge 9" />
                        <Badge badgeImage="/badge.png" badgeTitle="Badge 10" />
                    </div>
                    <div>
                        <h1>{name}</h1>
                        <RolePlate />
                    </div>
                    <div>
                        <ConfirmButton
                            changesMade={changesMade}
                            onPress={() => {
                                setChangeMade(false);
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export type WrapperProps = {
    mainApp: React.ElementType;
};
