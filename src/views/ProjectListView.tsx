
import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Plus, Folder, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const ProjectListView = () => {
    const { projects, fetchProjects, createProject, setCurrentProject, user } = useStore();
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProjectName.trim()) return;

        await createProject(newProjectName);
        setNewProjectName('');
        setIsCreating(false);
    };

    const handleProjectClick = (projectId: string) => {
        setCurrentProject(projectId);
        navigate(`/project/${projectId}`);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white shadow px-4 py-4 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-900">My Projects</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 hidden sm:inline">{user?.email}</span>
                    <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-500">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            {/* Project Grid */}
            <main className="p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {/* Create New Logic */}
                <div
                    onClick={() => setIsCreating(true)}
                    className="aspect-square bg-white rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                    <Plus className="text-gray-400 mb-2" size={32} />
                    <span className="text-gray-500 font-medium">New Project</span>
                </div>

                {/* Project List */}
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => handleProjectClick(project.id)}
                        className="aspect-square bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Folder size={24} />
                        </div>
                        <h3 className="font-semibold text-gray-800 text-center px-2 truncate w-full">
                            {project.name}
                        </h3>
                        <span className="text-xs text-gray-400 mt-1">
                            {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </main>

            {/* Create Modal (Simple Overlay) */}
            {isCreating && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                        <h3 className="text-lg font-bold mb-4">Create New Project</h3>
                        <form onSubmit={handleCreate}>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Project Name (e.g., Home, Office)"
                                className="w-full border rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreating(false)}
                                    className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
