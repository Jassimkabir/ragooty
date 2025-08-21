import { ThemeProvider } from '@/components/admin/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/user/navbar';
import Footer from '@/components/user/footer';
import AgeGateWrapper from '@/components/ui/age-gate-wrapper';

const poppins = Poppins({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Ragooty Sasidharan | Photography',
  description:
    'Discover the photography portfolio of Ragooty Sasidharan, specializing in portrait, landscape, and event photography. Explore stunning visual stories, creative projects, and professional photo galleries that capture moments with artistry and passion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(poppins.className, 'min-h-screen flex flex-col')}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <AgeGateWrapper>
            <main className='flex-1'>{children}</main>
            <Footer />
            <Toaster />
          </AgeGateWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
