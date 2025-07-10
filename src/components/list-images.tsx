'use client';

import { Image, listImagesWithCategories } from '@/api/images';
import { useEffect, useState } from 'react';
import { BlurFade } from './magicui/blur-fade';
import { Skeleton } from './ui/skeleton';

type ListImagesProps = {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
};

const ListImages = ({ images, setImages }: ListImagesProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listImagesWithCategories().then((data) => {
      console.log('DATA', data);
      const fixedData = data.map((img: any) => ({
        ...img,
        image_categories: img.image_categories.map((ic: any) => ({
          category: Array.isArray(ic.category) ? ic.category[0] : ic.category,
        })),
      }));
      setImages(fixedData);
      setLoading(false);
    });
  }, []);

  // if (loading) {
  //   return (
  //     <div className='columns-2 gap-4 sm:columns-3'>
  //       {[...Array(4)].map((_, idx) => (
  //         <BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
  //           <Skeleton key={idx} className='mb-4 h-48 w-full rounded-lg' />
  //         </BlurFade>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className='columns-2 gap-4 sm:columns-3'>
      {images.map((image, idx) => (
        <BlurFade key={image.url} delay={0.25 + idx * 0.05} inView>
          <img
            src={image.url}
            alt=''
            className='mb-4 size-full rounded-lg object-contain'
          />
        </BlurFade>
      ))}
    </div>
  );
};

export default ListImages;
