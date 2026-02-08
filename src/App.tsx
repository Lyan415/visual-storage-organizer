
import { MobileLayout } from './layouts/MobileLayout';
import { HierarchyView } from './views/HierarchyView';
import { FlatView } from './views/FlatView';
import { useStore } from './store/useStore';

function App() {
  const { viewMode } = useStore();

  return (
    <MobileLayout>
      {viewMode === 'hierarchy' ? <HierarchyView /> : <FlatView />}
    </MobileLayout>
  );
}

export default App;
