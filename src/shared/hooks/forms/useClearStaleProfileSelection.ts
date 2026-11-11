import { useEffect } from 'react';

type Identifiable = { id?: number | null };

/** Drop localStorage selection when list is empty or id is gone. */
const useClearStaleProfileSelection = (
    items: Identifiable[] | undefined,
    selectedId: number | null,
    setSelectedId: (id: number | null) => void,
) => {
    useEffect(() => {
        if (items === undefined) return;
        if (selectedId == null) return;
        const stillThere = items.some((item) => item.id === selectedId);
        if (!stillThere) {
            setSelectedId(null);
        }
    }, [items, selectedId, setSelectedId]);
};

export default useClearStaleProfileSelection;
