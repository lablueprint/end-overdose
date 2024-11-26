import NamePlate from './NamePlate';

interface ScrollableListProps {
    values: string[];
}

function ScrollableList({ values }: ScrollableListProps) {
    const listValues = values.map((value: string) => (
        <NamePlate key={value} name={value} />
    ));

    return (
        <div style={{ height: '200px', overflow: 'scroll' }}>{listValues}</div>
    );
}

export default ScrollableList;
