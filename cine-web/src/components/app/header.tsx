import Link from 'next/link';
import Image from 'next/image';
import { MainNav } from './main-nav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/teste.png"
            alt="CINEWEB Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="font-bold font-headline text-lg text-primary">
            CINEWEB
          </span>
        </Link>
        <MainNav />
      </div>
    </header>
  );
}
