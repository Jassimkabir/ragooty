'use client';

import { cn } from '@/lib/utils';
import { Building2, Heart, Sparkles, User } from 'lucide-react';
import { motion, Variants } from 'motion/react';
import { Cinzel_Decorative, Fira_Sans_Condensed } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const Cin = Cinzel_Decorative({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Fira = Fira_Sans_Condensed({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const InstagramIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
    </svg>
  );
};

const FacebookIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
    </svg>
  );
};

const BehanceIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path d='M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z' />
    </svg>
  );
};

const WhatsappIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' />
    </svg>
  );
};

const AboutPage = () => {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const socialLinks = [
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/ragooty_sasidharan/',
      icon: InstagramIcon,
      color: 'hover:text-pink-400',
    },
    {
      title: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=100008807614921&mibextid=LQQJ4d',
      icon: FacebookIcon,
      color: 'hover:text-blue-400',
    },
    {
      title: 'Behance',
      href: 'https://www.behance.net/ragootys',
      icon: BehanceIcon,
      color: 'hover:text-blue-600',
    },
    {
      title: 'WhatsApp',
      href: 'https://wa.me/918075255527',
      icon: WhatsappIcon,
      color: 'hover:text-green-400',
    },
  ];

  return (
    <div className='min-h-screen pt-24 pb-16 px-4 md:px-6'>
      <div className='container mx-auto max-w-6xl'>
        <motion.div
          className='text-center mb-16 md:mb-24'
          initial='hidden'
          animate='visible'
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className={cn(
              Fira.className,
              'text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight'
            )}
          >
            About Me
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className={cn(
              Fira.className,
              'text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'
            )}
          >
            Chasing light, capturing moments, and telling stories through the
            lens of creativity
          </motion.p>
        </motion.div>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-start'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='relative'
          >
            <div className='relative aspect-[4/5] overflow-hidden rounded-2xl'>
              <Image
                src='/images/ragooty.JPG'
                alt='Ragooty Sasidharan'
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent' />
            </div>
          </motion.div>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={staggerContainer}
            className='space-y-8'
          >
            <motion.div variants={fadeInUp}>
              <h2 className={cn(Cin.className, 'text-3xl md:text-4xl mb-6')}>
                Ragooty Sasidharan
              </h2>
              <div
                className={cn(
                  Fira.className,
                  'text-lg text-muted-foreground leading-relaxed space-y-4'
                )}
              >
                <p>
                  I'm Ragooty Sasidharan, a photographer from Kochi, now
                  following stories wherever they lead.
                </p>
                <p>
                  To me, photography is more than a profession, it's a form of
                  visual storytelling. A canvas where emotion, culture, and
                  imagination collide. Every frame is a quiet statement:
                  sometimes a reflection, sometimes a rebellion, always
                  intentional.
                </p>
                <p>
                  Whether it's the quiet intimacy of a portrait, the bold edge
                  of boudoir, or the crafted precision of brand work, I aim to
                  create images that don't just capture, they cut through. I
                  want my photographs to linger, to provoke, to sell with soul.
                </p>
                <p>
                  From fine art to commercial campaigns, I explore light and
                  shadow as tools for meaning. If you believe in meaningful
                  visuals, let's create something that cuts through the noise.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className='space-y-6'>
              <h3
                className={cn(Fira.className, 'text-2xl md:text-3xl font-bold')}
              >
                Expertise
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                {[
                  {
                    icon: Sparkles,
                    title: 'FineArt Photography',
                    desc: 'Artistic storytelling through visual narratives',
                  },
                  {
                    icon: Heart,
                    title: 'Boudoir Photography',
                    desc: 'Intimate portraits with bold artistic vision',
                  },
                  {
                    icon: User,
                    title: 'Portrait Photography',
                    desc: 'Quiet intimacy and emotional depth',
                  },
                  {
                    icon: Building2,
                    title: 'Brand & Commercial',
                    desc: 'Crafted precision for meaningful campaigns',
                  },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className='bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:bg-card/70 transition-colors'
                  >
                    <skill.icon className='w-8 h-8 text-primary mb-3' />
                    <h4 className={cn(Fira.className, 'font-semibold mb-2')}>
                      {skill.title}
                    </h4>
                    <p
                      className={cn(
                        Fira.className,
                        'text-sm text-muted-foreground'
                      )}
                    >
                      {skill.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className='space-y-6'>
              <h3
                className={cn(Fira.className, 'text-2xl md:text-3xl font-bold')}
              >
                Let's Connect
              </h3>
              <div className='space-y-4'>
                <div className={cn(Fira.className, 'text-lg')}>
                  <span className='text-muted-foreground'>Email: </span>
                  <a
                    href='mailto:ragootysasidharan@gmail.com'
                    className='text-primary hover:underline transition-colors'
                  >
                    ragootysasidharan@gmail.com
                  </a>
                </div>

                <div className='flex gap-4'>
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.title}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50',
                        'hover:bg-card/70 transition-all duration-300',
                        social.color
                      )}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className='text-center mt-16 md:mt-24'
        >
          <div className='bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20'>
            <h3
              className={cn(
                Fira.className,
                'text-2xl md:text-3xl font-bold mb-4'
              )}
            >
              Ready to Create Something Beautiful?
            </h3>
            <p
              className={cn(
                Fira.className,
                'text-lg text-muted-foreground mb-6 max-w-2xl mx-auto'
              )}
            >
              Let's collaborate to create images that cut through the noise.
              Whether it's a fine art project, intimate boudoir session,
              meaningful portrait, or brand campaign with soul, I'm here to help
              you tell your story.
            </p>
            <Link
              href='/contact'
              className={cn(
                Fira.className,
                'inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full',
                'hover:bg-primary/90 transition-colors font-medium'
              )}
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
