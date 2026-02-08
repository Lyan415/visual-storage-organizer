import type { Item } from '../types';

const now = Date.now();

export const mockItems: Item[] = [
    // Root Level - Rooms
    { id: 'root-1', name: 'Living Room', imageUrl: 'https://images.unsplash.com/photo-1583847661867-dac18de51a96?auto=format&fit=crop&q=80&w=800', parentId: null, createdAt: now },
    { id: 'root-2', name: 'Bedroom', imageUrl: 'https://images.unsplash.com/photo-1616594039964-40891a909d9f?auto=format&fit=crop&q=80&w=800', parentId: null, createdAt: now },

    // Level 2 - Furniture (Inside Living Room)
    { id: 'lr-tv-stand', name: 'TV Stand', imageUrl: 'https://images.unsplash.com/photo-1593796320384-6b321628a517?auto=format&fit=crop&q=80&w=800', parentId: 'root-1', createdAt: now },
    { id: 'lr-shelf', name: 'Book Shelf', imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a729e1e83a9?auto=format&fit=crop&q=80&w=800', parentId: 'root-1', createdAt: now },

    // Level 3 - Containers (Inside TV Stand)
    { id: 'tvs-drawer-1', name: 'Top Drawer', imageUrl: 'https://images.unsplash.com/photo-1551590192-807e80d7b105?auto=format&fit=crop&q=80&w=800', parentId: 'lr-tv-stand', createdAt: now },

    // Level 4 - Items (Inside Top Drawer)
    { id: 'item-batteries', name: 'AA Batteries', imageUrl: 'https://images.unsplash.com/photo-1619642034932-8dfb5a932d56?auto=format&fit=crop&q=80&w=800', parentId: 'tvs-drawer-1', note: 'Rechargeable ones', createdAt: now },
    { id: 'item-cable', name: 'HDMI Cable', imageUrl: 'https://images.unsplash.com/photo-1558235252-95f3607063de?auto=format&fit=crop&q=80&w=800', parentId: 'tvs-drawer-1', createdAt: now },

    // Level 2 - Furniture (Inside Bedroom)
    { id: 'br-closet', name: 'Closet', imageUrl: 'https://images.unsplash.com/photo-1558997916-d83d37492c48?auto=format&fit=crop&q=80&w=800', parentId: 'root-2', createdAt: now },

    // Level 3 - Container (Inside Closet)
    { id: 'br-box-winter', name: 'Winter Box', imageUrl: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=80&w=800', parentId: 'br-closet', createdAt: now },

    // Level 4 - Item (Inside Winter Box)
    { id: 'item-scarf', name: 'Red Scarf', imageUrl: 'https://images.unsplash.com/photo-1520903920248-2c77df690dfa?auto=format&fit=crop&q=80&w=800', parentId: 'br-box-winter', createdAt: now },
];
