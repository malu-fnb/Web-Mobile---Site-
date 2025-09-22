'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MovieCard } from '@/components/app/movie-card';
import { Search } from 'lucide-react';
import { searchMedia } from '@/lib/tmdb';
import type { Media, MediaType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchPage() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MediaType | 'any'>('any');
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [popular, setPopular] = useState<Media[]>([]);

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      const popularResults = await searchMedia('', 'multi');
      setPopular(popularResults);
      setLoading(false);
    };
    fetchPopular();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    setSearched(true);
    const searchType = type === 'any' ? 'multi' : type;
    const searchResults = await searchMedia(title, searchType);
    setResults(searchResults);
    setLoading(false);
  };

  const displayResults = searched ? results : popular;

  return (
    <div className="space-y-12">
      <section id="search">
        <Card className="max-w-4xl mx-auto border-0 shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline text-primary">
              Busque por Filmes e Séries
            </CardTitle>
            <CardDescription>
              Encontre seu próximo programa favorito para assistir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end max-w-2xl mx-auto"
            >
              <div className="lg:col-span-2 space-y-2">
                <label htmlFor="title" className="sr-only">Título</label>
                <Input
                  id="title"
                  placeholder="Ex: The Matrix"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="type" className="sr-only">Tipo</label>
                <Select
                  value={type}
                  onValueChange={(value) => setType(value as MediaType | 'any')}
                >
                  <SelectTrigger id="type" className="text-base">
                    <SelectValue placeholder="Qualquer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Qualquer</SelectItem>
                    <SelectItem value="movie">Filme</SelectItem>
                    <SelectItem value="tv">Série</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-3">
                <Button type="submit" size="lg" className="w-full" disabled={loading && searched}>
                  <Search className="mr-2 h-4 w-4" />{' '}
                  {loading && searched ? 'Buscando...' : 'Buscar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <section id="results">
        <h2 className="text-3xl font-headline mb-6 text-center">
          {searched ? 'Resultados da Busca' : 'Populares do Momento'}
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
               <Card key={i} className="border-0 shadow-none">
                <Skeleton className="h-[400px] w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                   <Skeleton className="h-4 w-1/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayResults.map((media) => (
              <MovieCard key={media.id} media={media} />
            ))}
          </div>
        )}
         {searched && !loading && results.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">Nenhum resultado encontrado para sua busca.</p>
        )}
      </section>
    </div>
  );
}