import NamePlate from './NamePlate';

interface ScrollableListProps {
    names: string[];
    selectedIndex: number;
}

/**
 * Component containing each of the 2 (or eventually 3) lists for name generation
 * Note: Scrollable list is undecided by end overdose currently. The component is still available, but all relevant implementation code is commented under the component.
 * Documentation may be limited, so if we are reusing this, talk to Dalton Silverman
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

/** 
 * 
 * 
 * 
 *     const [name, setName] = useState(
        adjectives[selectedIndex1].concat(' ', nouns[selectedIndex2])
    );
 *    const [changesMade, setChangeMade] = useState(false);
 * 
 *  useEffect(() => {
        setChangeMade(true);
        setName(adjectives[selectedIndex1].concat(' ', nouns[selectedIndex2]));

        const scrollableLists =
            document.getElementsByClassName('scrollableList');

        if (scrollableLists.length >= 2) {
            const scrollableList1 = scrollableLists[0] as HTMLElement;
            const scrollableList2 = scrollableLists[1] as HTMLElement;

            const selectedElement1 = scrollableList1.querySelector(
                '.selectedNamePlate'
            ) as HTMLElement;
            const selectedElement2 = scrollableList2.querySelector(
                '.selectedNamePlate'
            ) as HTMLElement;

            if (selectedElement1 && scrollableList1) {
                const scrollOffset1 =
                    selectedElement1.offsetTop -
                    scrollableList1.clientHeight / 2;
                scrollableList1.scrollTo({
                    top: scrollOffset1,
                    behavior: 'smooth',
                });
            }

            if (selectedElement2 && scrollableList2) {
                const scrollOffset2 =
                    selectedElement2.offsetTop -
                    scrollableList2.clientHeight / 2 +
                    selectedElement2.clientHeight / 2;
                scrollableList2.scrollTo({
                    top: scrollOffset2,
                    behavior: 'smooth',
                });
            }
        }
    }, [selectedIndex1, selectedIndex2]); 
    
    
    
    
    
    // const [selectedIndex1, setSelectedIndex1] = useState(0);
    // const [selectedIndex2, setSelectedIndex2] = useState(0);

       /*   const incrementIndex1 = () => {
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
            setProfileChanged(true);
        }
    }; 
    
    
    
    
    
    
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
    
    
                        .scrollableList {
        height: 175px;
        overflow: scroll;
        padding: 20px;
    }
    
    
    */
