import Image from 'next/image';
import { BadgeMark, Button } from '@mui/material';
import NamePlate from './Components/NamePlate';
import Badge from './Components/Badge';
import NameTable from './Components/NameTable';
import { adjectives, nouns } from './data';

export default function Home() {
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
                            table2Vals={nouns}
                            table3Vals={adjectives}
                        />
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
                </div>
            </main>
        </div>
    );
}

export type WrapperProps = {
    mainApp: React.ElementType;
};
