import { useEffect } from 'react';

type Options = {
    ignoreWhenActiveElementMatches?: string | null;
};

export default function useKeyboardShortcut(
    key: string,
    callback: (event: KeyboardEvent) => void,
    { ignoreWhenActiveElementMatches = 'input, select, textarea, [contenteditable=true]' }: Options = {}
) {
    useEffect(() => {
        function handleKeyPressed(event: KeyboardEvent) {
            if (
                ignoreWhenActiveElementMatches &&
                document.activeElement &&
                document.activeElement.matches(ignoreWhenActiveElementMatches)
            ) {
                return;
            }

            if (event.key === key) {
                callback(event);
            }
        }

        window.addEventListener('keyup', handleKeyPressed);

        return () => {
            window.removeEventListener('keyup', handleKeyPressed);
        };
    }, [key, callback]);
}
