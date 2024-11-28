import ScrollableList from './ScrollableList';

interface NameTableProps {
    // interface
    table1Vals: string[];
    table1Index: number;
    table2Vals: string[];
    table2Index: number;
    //buttonSelect: (word1: string, word2: string, word3: string) => void;
}

const NameTable = ({
    table1Vals,
    table2Vals,
    table1Index,
    table2Index,
}: NameTableProps) => {
    // child

    /* const handleButtonClick = () => {
        buttonSelect(word1, word2, word3);
    } **/

    return (
        <div style={{ display: 'flex' }}>
            <ScrollableList values={table1Vals} selectedIndex={table1Index} />
            <ScrollableList values={table2Vals} selectedIndex={table2Index} />
        </div>
    );
};

export default NameTable;
