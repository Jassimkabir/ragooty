import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Ragooty Sasidharan | Photography',
  description:
    'Discover the photography portfolio of Ragooty Sasidharan, specializing in portrait, landscape, and event photography. Explore stunning visual stories, creative projects, and professional photo galleries that capture moments with artistry and passion.',
};

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
