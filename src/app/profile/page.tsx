import Image from 'next/image';
import { ScrollView, ScrollableElement } from '@elissaioskon/scrollable-list';

export default function Home() {
    return (
        <div>
            <title> End Overdose </title>
            <main>
                {' '}
                <div className="badge-table">
                    <div> Badge 1 </div>
                    <div> Badge 2 </div>
                    <div> Badge 3 </div>
                    <div> Badge 4 </div>
                    <div> Badge 5 </div>
                    <div> Badge 6 </div>
                    <div> Badge 7 </div>
                    <div> Badge 8 </div>
                    <div> Badge 9 </div>
                    <div> Badge 10 </div>
                </div>
            </main>
        </div>
    );
}

export type WrapperProps = {
    mainApp: React.ElementType;
};
