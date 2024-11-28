import NamePlate from './NamePlate';

interface ScrollableListProps {
    values: string[];
    selectedIndex: number;
}

/**const handleButtonClick = (word: string) => {
    if (word !== selectedWord) {
        
    }
}; **/

function ScrollableList({ values, selectedIndex }: ScrollableListProps) {
    const listValues = values.map((value: string, index: number) => (
        <NamePlate
            key={value}
            name={value}
            index={index}
            selectedIndex={selectedIndex}
        />
    ));

    return (
        <div style={{ height: '175px', overflow: 'scroll' }}>{listValues}</div>
    );
}

export default ScrollableList;
