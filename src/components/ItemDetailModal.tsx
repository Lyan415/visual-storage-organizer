import React, { useState } from 'react';
import { X, MapPin, Trash2, Move, ChevronRight, Home } from 'lucide-react';
import type { Item } from '../types';
import { useStore } from '../store/useStore';
import { FolderPicker } from './FolderPicker';

interface ItemDetailModalProps {
    item: Item | null;
    onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
    const { getPath, navigateToFolder, setViewMode, deleteItem, moveItem } = useStore();
    const [isMovePickerOpen, setIsMovePickerOpen] = useState(false);

    if (!item) return null;

    const path = getPath(item.id);

    const handleNavigateToFolder = (folderId: string | null) => {
        navigateToFolder(folderId);
        setViewMode('hierarchy');
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
            deleteItem(item.id);
            onClose();
        }
    };

    const handleMove = (newParentId: string | null) => {
        moveItem(item.id, newParentId);
        setIsMovePickerOpen(false);
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-md hover:bg-black/30"
                    >
                        <X size={20} />
                    </button>

                    {/* Hero Image */}
                    <div className="h-64 w-full bg-gray-100">
                        <img
                            src={item.imageUrl || ''}
                            alt={item.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex items-start justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsMovePickerOpen(true)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                    title="Move Item"
                                >
                                    <Move size={20} />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    title="Delete Item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        {item.note && (
                            <p className="mt-2 text-gray-600">{item.note}</p>
                        )}

                        <div className="mt-6 space-y-4">
                            {/* Location Context */}
                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-700">
                                    <MapPin size={16} />
                                    Location:
                                </div>

                                <div className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
                                    {/* Root Link */}
                                    <button
                                        onClick={() => handleNavigateToFolder(null)}
                                        className="flex items-center text-blue-600 font-medium px-2 py-1 rounded hover:bg-blue-50 hover:underline active:bg-blue-100 transition-colors"
                                    >
                                        <Home size={14} className="mr-1" />
                                        Root
                                    </button>

                                    {/* Path Segments */}
                                    {path.map((pathItem) => (
                                        <React.Fragment key={pathItem.id}>
                                            <ChevronRight size={14} className="text-gray-400" />
                                            <button
                                                onClick={() => handleNavigateToFolder(pathItem.id)}
                                                className="text-blue-600 font-medium px-2 py-1 rounded truncate max-w-[100px] hover:bg-blue-50 hover:underline active:bg-blue-100 transition-colors"
                                            >
                                                {pathItem.name}
                                            </button>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FolderPicker
                isOpen={isMovePickerOpen}
                onClose={() => setIsMovePickerOpen(false)}
                itemToMove={item}
                onMove={handleMove}
            />
        </>
    );
};
