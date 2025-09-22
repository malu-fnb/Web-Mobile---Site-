import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Bookmark, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getMediaDetails } from '@/lib/tmdb';
import type { Media } from '@/lib/types';

export default async function MediaDetailPage({ params }: { params: { id: string } }) {
  const [type, tmdbId] = params.id.split('-');
  
  if (!type || !tmdbId || (type !== 'movie' && type !== 'tv')) {
    notFound();
  }
  
  const media = await getMediaDetails(tmdbId, type as 'movie' | 'tv');

  if (!media) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1">
          <Image
            src={media.posterUrl}
            alt={`Pôster de ${media.title}`}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
            data-ai-hint={media.posterImageHint}
          />
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              {media.title}
            </h1>
            <p className="text-xl text-muted-foreground">{media.year}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-lg">{media.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>
            <span className="font-code text-sm bg-muted text-muted-foreground px-2 py-1 rounded">
              TMDB ID: {media.tmdbId}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Sinopse</h2>
            <p className="text-foreground/80 leading-relaxed">
              {media.synopsis}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Gêneros</h2>
            <div className="flex flex-wrap gap-2">
              {media.genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="text-sm">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button size="lg">
              <Bookmark className="mr-2 h-5 w-5" />
              Salvar no Perfil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
