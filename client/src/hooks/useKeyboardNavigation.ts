import { useState, useEffect, useCallback } from 'react';

export function useKeyboardNavigation(
    itemsLength: number,
    onSelect: (index: number) => void
) {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            // Ignore if input is focused
            if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
                return;
            }

            switch (e.key) {
                case 'ArrowDown':
                case 'j':
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev < itemsLength - 1 ? prev + 1 : prev));
                    break;
                case 'ArrowUp':
                case 'k':
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
                    break;
                case 'Enter':
                    if (selectedIndex >= 0 && selectedIndex < itemsLength) {
                        e.preventDefault();
                        onSelect(selectedIndex);
                    }
                    break;
            }
        },
        [itemsLength, selectedIndex, onSelect]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Reset selection when items change (e.g., search filter)
    useEffect(() => {
        setSelectedIndex(-1);
    }, [itemsLength]);

    return selectedIndex;
}
