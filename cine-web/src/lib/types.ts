export type MediaType = 'movie' | 'tv';

export interface Media {
  id?: string; // Alterado para opcional, pois virá do DB
  tmdbId: string;
  title: string;
  year: string;
  posterUrl: string;
  posterImageHint: string;
  type: MediaType;
  rating: number;
  synopsis: string;
  genres: string[];
}

export interface SavedMedia extends Media {
  status: 'watched' | 'pending';
  userRating: number | null;
  notes: string | null;
}

export interface Genre {
  id: number;
  name: string;
}
