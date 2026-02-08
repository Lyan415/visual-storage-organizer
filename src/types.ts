export interface Item {
    id: string;
    name: string;
    imageUrl?: string; // Optional for now, can be a placeholder
    note?: string;
    parentId: string | null;
    createdAt: number;
}

export type ViewMode = 'hierarchy' | 'flat';
