import ReadableLayout from '@/components/ReadableLayout';
import AskPanel from '@/components/AskPanel';

const Index = () => (
  <>
    <div className="fixed inset-0 -z-10" style={{ background: 'hsl(var(--ink))' }} />
    <ReadableLayout />
    <AskPanel />
  </>
);

export default Index;
