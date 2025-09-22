import Link from 'next/link';
import { Film } from 'lucide-react';
import { MainNav } from './main-nav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg text-primary">
            CINEWEB
          </span>
        </Link>
        <MainNav />
      </div>
    </header>
  );
}