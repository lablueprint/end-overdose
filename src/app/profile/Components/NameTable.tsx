import ScrollableList from './ScrollableList';

interface NameTableProps {
    // interface
    table1Vals: string[];
    table2Vals: string[];
    table3Vals: string[];
}

const NameTable = ({ table1Vals, table2Vals, table3Vals }: NameTableProps) => {
    // child
    return (
        <div style={{ display: 'flex' }}>
            <ScrollableList values={table1Vals} />
            <ScrollableList values={table2Vals} />
            <ScrollableList values={table3Vals} />
        </div>
    );
};

export default NameTable;
