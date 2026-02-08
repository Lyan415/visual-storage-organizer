import { create } from 'zustand';
import type { Item, ViewMode } from '../types';
import { mockItems } from '../data/mockData';

interface StoreState {
    items: Item[];
    viewMode: ViewMode;
    currentFolderId: string | null;
    history: (string | null)[]; // For back navigation

    setViewMode: (mode: ViewMode) => void;
    navigateToFolder: (folderId: string | null) => void;
    navigateBack: () => void;
    addItem: (item: Item) => void;
    deleteItem: (itemId: string) => void;
    moveItem: (itemId: string, newParentId: string | null) => void;
    getItemsInFolder: (folderId: string | null) => Item[];
    getParent: (itemId: string) => Item | undefined;
    getItem: (itemId: string) => Item | undefined;
    getPath: (itemId: string) => Item[]; // Returns path from root to item
}

export const useStore = create<StoreState>((set, get) => ({
    items: mockItems,
    viewMode: 'hierarchy',
    currentFolderId: null,
    history: [],

    setViewMode: (mode) => set({ viewMode: mode }),

    navigateToFolder: (folderId) =>
        set((state) => ({
            currentFolderId: folderId,
            history: [...state.history, state.currentFolderId]
        })),

    navigateBack: () => set((state) => {
        if (state.history.length === 0) return {};
        const previous = state.history[state.history.length - 1];
        return {
            currentFolderId: previous,
            history: state.history.slice(0, -1)
        };
    }),

    addItem: (item) => set((state) => ({ items: [...state.items, item] })),

    deleteItem: (itemId) => set((state) => {
        // 1. Find all descendant IDs (recursive)
        const getDescendants = (id: string, allItems: Item[]): string[] => {
            const children = allItems.filter(i => i.parentId === id);
            let descendants = children.map(c => c.id);
            children.forEach(child => {
                descendants = [...descendants, ...getDescendants(child.id, allItems)];
            });
            return descendants;
        };

        const descendants = getDescendants(itemId, state.items);
        const idsToDelete = [itemId, ...descendants];

        // 2. If currentFolderId is being deleted, move up
        let newCurrentFolderId = state.currentFolderId;
        if (newCurrentFolderId && idsToDelete.includes(newCurrentFolderId)) {
            // Simply go to root for safety in this version
            newCurrentFolderId = null;
        }

        return {
            items: state.items.filter(i => !idsToDelete.includes(i.id)),
            currentFolderId: newCurrentFolderId,
        };
    }),

    moveItem: (itemId, newParentId) => set((state) => {
        // Validation: Cannot move into itself or its descendants
        if (itemId === newParentId) return {}; // No op

        const getDescendants = (id: string, allItems: Item[]): string[] => {
            const children = allItems.filter(i => i.parentId === id);
            let descendants = children.map(c => c.id);
            children.forEach(child => {
                descendants = [...descendants, ...getDescendants(child.id, allItems)];
            });
            return descendants;
        };

        const descendants = getDescendants(itemId, state.items);
        if (newParentId && descendants.includes(newParentId)) {
            console.warn("Cannot move item into its own descendant");
            return {};
        }

        return {
            items: state.items.map(item =>
                item.id === itemId ? { ...item, parentId: newParentId } : item
            )
        };
    }),

    getItemsInFolder: (folderId) => {
        return get().items.filter(item => item.parentId === folderId);
    },

    getParent: (itemId) => {
        const item = get().items.find(i => i.id === itemId);
        if (!item || !item.parentId) return undefined;
        return get().items.find(i => i.id === item.parentId);
    },

    getItem: (itemId) => get().items.find(i => i.id === itemId),

    getPath: (itemId) => {
        // Traverse up to find path
        const path: Item[] = [];
        let current = get().items.find(i => i.id === itemId);
        while (current) {
            // If we want the path to include the item itself, keep this.
            // If we want strictly parents, modify logic.
            // Requirement implies knowing "Location", so ancestors are key.
            if (current.parentId) {
                const parent = get().items.find(i => i.id === current!.parentId);
                if (parent) {
                    path.unshift(parent);
                    current = parent;
                } else {
                    current = undefined;
                }
            } else {
                current = undefined;
            }
        }
        return path;
        // Alternative: Just return the breadcrumb list including root to immediate parent
    }
}));
