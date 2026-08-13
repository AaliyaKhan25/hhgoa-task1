// Remove the standard top-level import:
// import Generator from '@/components/Generator';

// Replace it with dynamic import:
import dynamic from 'next/dynamic';

const Generator = dynamic(() => import('@/components/Generator'), {
  ssr: false, // This ensures it only loads in the browser
});

export default function Home() {
  return (
    <main>
      <Generator />
    </main>
  );
}