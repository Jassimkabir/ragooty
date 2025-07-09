import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className='relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden'>
      <DotPattern
        glow={true}
        className={cn(
          '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]'
        )}
      />
      <span>Coming Soon</span>
    </div>
  );
}
