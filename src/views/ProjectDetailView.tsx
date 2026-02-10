import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { MobileLayout } from '../layouts/MobileLayout';
import { HierarchyView } from './HierarchyView';
import { FlatView } from './FlatView';

export const ProjectDetailView = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { viewMode, setCurrentProject, currentProjectId, isLoading } = useStore();


    useEffect(() => {
        if (projectId && projectId !== currentProjectId) {
            setCurrentProject(projectId);
        }
    }, [projectId, setCurrentProject, currentProjectId]);

    if (isLoading && !currentProjectId) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <MobileLayout>
            {viewMode === 'hierarchy' ? <HierarchyView /> : <FlatView />}
        </MobileLayout>
    );
};
