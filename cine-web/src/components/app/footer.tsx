import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  const teamMembers = [
    "Malu de Faria Neves Bezerra",
    "Vinicius Anderson Cavalcanti Silva",
    "Leandro Lima da Silva",
    "Pedro Victor Gomes de Araújo",
  ];

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-center gap-4 py-6 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Desenvolvido por: {teamMembers.join(", ")}.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Link href="https://github.com/malu-fnb/Web-Mobile---Site-" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4 flex items-center gap-2">
                <Github className="h-5 w-5" />
                <span>Código Fonte no GitHub</span>
            </Link>
        </div>
      </div>
    </footer>
  );
}