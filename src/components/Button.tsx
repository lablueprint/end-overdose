// a generic button that handles some action

'use client';
import { useState } from 'react';

interface ButtonProps<T> {
    title: string; // name of the button
    actionArgs: T; // the arguments to pass into the action
    handleAction: (value: T) => void; // the action to perform when the button is clicked
    style?: string; // the style of the button
    loadingText?: string; // the text to display when the button is loading
}

export const GenericButton = <T,>({
    title,
    actionArgs,
    handleAction,
    style,
    loadingText,
}: ButtonProps<T>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        setLoading(true);
        setError(null);
        try {
            await handleAction(actionArgs);
        } catch (error) {
            setError(JSON.stringify(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleClick} disabled={loading} className={style}>
                {loading ? loadingText : title}
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};
