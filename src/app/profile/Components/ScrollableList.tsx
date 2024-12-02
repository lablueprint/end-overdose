import NamePlate from './NamePlate';
import './profileStyles.css';

interface ScrollableListProps {
    names: string[];
    selectedIndex: number;
}

/**
 * Component containing each of the 2 (or eventually 3) lists for name generation
 **/

function ScrollableList({ names, selectedIndex }: ScrollableListProps) {
    const listValues = names.map((name: string, index: number) => (
        <NamePlate
            key={name}
            name={name}
            index={index}
            selectedIndex={selectedIndex}
        />
    ));

    return <div className="scrollableList">{listValues}</div>;
}

export default ScrollableList;
