import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/app/header';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/app/footer';
import { ProfileProvider } from '@/context/profile-context';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: 'CINEWEB',
  description: 'Seu universo pessoal de filmes e séries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col',
          fontBody.variable,
          fontCode.variable
        )}
      >
        <ProfileProvider>
          <Header />
          <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>
          <Toaster />
          <Footer />
        </ProfileProvider>
      </body>
    </html>
  );
}