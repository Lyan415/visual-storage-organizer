import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ItemCard } from '../components/ItemCard';
import { ItemDetailModal } from '../components/ItemDetailModal';
import type { Item } from '../types';

export const FlatView: React.FC = () => {
    const { items, getPath, navigateToFolder, setViewMode } = useStore();
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    // In a real app, we might want to filter out 'root' containers if they are just rooms, 
    // but for "Photo Search" mode usually we want everything.
    // Let's sort by newest first
    const sortedItems = [...items].sort((a, b) => b.createdAt - a.createdAt);

    const handleItemClick = (item: Item) => {
        setSelectedItem(item);
    };

    const handlePathClick = (folderId: string | null) => {
        navigateToFolder(folderId);
        setViewMode('hierarchy');
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {sortedItems.map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        onClick={handleItemClick}
                        showPath={true}
                        path={getPath(item.id)}
                        onPathClick={handlePathClick}
                    />
                ))}
            </div>

            <ItemDetailModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </>
    );
};
