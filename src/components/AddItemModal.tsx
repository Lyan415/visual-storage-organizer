import React, { useState } from 'react';
import { X, Upload, Camera } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Item } from '../types';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
    const { currentFolderId, addItem } = useStore();
    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);

        // Simulate network delay for upload
        setTimeout(() => {
            const newItem: Item = {
                id: crypto.randomUUID(),
                name: name,
                note: note,
                parentId: currentFolderId,
                // Use the local preview URL if available, otherwise random unsplash
                // In a real app, this would be the URL returned from the server after upload
                imageUrl: previewUrl || `https://images.unsplash.com/photo-${['1618331835717-801e976710b2', '1586105251261-72a756497a11', '1589829085413-56de8ae18c73'][Math.floor(Math.random() * 3)]
                    }?auto=format&fit=crop&q=80&w=800`,
                createdAt: Date.now(),
            };

            addItem(newItem);
            setIsSubmitting(false);
            setName('');
            setNote('');
            setPreviewUrl(null);
            onClose();
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white sm:rounded-2xl rounded-t-2xl shadow-xl animate-in slide-in-from-bottom duration-300">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h2 className="text-lg font-semibold">Add New Item</h2>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-4">

                    {/* Real Upload Area */}
                    <label className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-dashed border-2 border-gray-300 bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors overflow-hidden">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center">
                                <Camera size={32} />
                                <span className="text-xs mt-2">Tap to take photo</span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment" // Favors rear camera on mobile
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Red Box"
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        // autoFocus removed for better mobile UX (keyboard pop)
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Note (Optional)</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Any details..."
                            rows={2}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!name.trim() || isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-md active:scale-95 disabled:bg-gray-300 disabled:shadow-none"
                    >
                        {isSubmitting ? 'Uploading...' : (
                            <>
                                <Upload size={18} />
                                Save Item
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
