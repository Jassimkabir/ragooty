import Image from 'next/image';

export default function About() {
  return (
    <div>
      <div></div>
      <div>
        <Image
          src='/images/ragooty-alternative.JPG'
          alt='Ragooty Sasidharan'
          width={400}
          height={300}
        />
      </div>
    </div>
  );
}
