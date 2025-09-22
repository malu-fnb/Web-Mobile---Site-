import type { Media, MediaType, Genre } from './types';

// ATENÇÃO: A chave da API do TMDB está diretamente no código abaixo.
const API_KEY = 'f0f837126ad3f38f1d78d397c936a14d';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

if (API_KEY === 'SUA_CHAVE_DE_API_VAI_AQUI') {
  console.error("ERRO: A chave da API do TMDB não foi definida no arquivo src/lib/tmdb.ts. Por favor, adicione sua chave para a API funcionar.");
}

// Helper to construct full image URLs
const getImageUrl = (path: string, size: string = 'w500') =>
  path ? `${IMAGE_BASE_URL}${size}${path}` : 'https://picsum.photos/seed/placeholder/500/750';

// Fetch genres and create a lookup map
let genreMap: Map<number, string> | null = null;
async function getGenreMap() {
  if (genreMap) return genreMap;

  try {
    const [movieGenresRes, tvGenresRes] = await Promise.all([
      fetch(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`),
      fetch(`${API_BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=pt-BR`),
    ]);
    if (!movieGenresRes.ok || !tvGenresRes.ok) {
      throw new Error(`Falha ao buscar gêneros: ${movieGenresRes.statusText} ${tvGenresRes.statusText}`);
    }
    const movieGenres = await movieGenresRes.json();
    const tvGenres = await tvGenresRes.json();
    
    const allGenres: Genre[] = [...movieGenres.genres, ...tvGenres.genres];
    genreMap = new Map(allGenres.map((genre) => [genre.id, genre.name]));
    
    return genreMap;
  } catch (error) {
    console.error('Falha ao carregar gêneros do TMDB:', error);
    return new Map();
  }
}


// Normalize API results into our Media type
const normalizeMedia = (item: any, genres: Map<number, string>): Media | null => {
  const mediaType: MediaType = item.media_type || (item.title ? 'movie' : 'tv');
  if (!item.poster_path) return null; // Skip items without a poster

  return {
    id: `${mediaType}-${item.id}`,
    tmdbId: item.id.toString(),
    title: item.title || item.name,
    year: (item.release_date || item.first_air_date || '').split('-')[0],
    posterUrl: getImageUrl(item.poster_path),
    posterImageHint: `${mediaType} poster`,
    type: mediaType,
    rating: item.vote_average,
    synopsis: item.overview,
    genres: item.genre_ids?.map((id: number) => genres.get(id)).filter(Boolean) as string[] || [],
  };
};

const normalizeMediaDetails = (item: any, mediaType: MediaType): Media => {
    return {
        id: `${mediaType}-${item.id}`,
        tmdbId: item.id.toString(),
        title: item.title || item.name,
        year: (item.release_date || item.first_air_date || '').split('-')[0],
        posterUrl: getImageUrl(item.poster_path),
        posterImageHint: `${mediaType} poster`,
        type: mediaType,
        rating: item.vote_average,
        synopsis: item.overview,
        genres: item.genres?.map((g: Genre) => g.name) || [],
    }
}

// Search for movies, TV series, or both
export async function searchMedia(query: string, type: 'movie' | 'tv' | 'multi'): Promise<Media[]> {
  const endpoint = query ? `search/${type}` : `${type === 'multi' ? 'trending/all/week' : 'discover/' + type }`;
  const url = `${API_BASE_URL}/${endpoint}?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na resposta da API TMDB:', errorData);
      throw new Error(errorData.status_message || `HTTP error! status: ${response.status}`);
    }
    const genres = await getGenreMap();
    const data = await response.json();
    
    return data.results
      .map((item: any) => normalizeMedia(item, genres))
      .filter(Boolean) as Media[];
  } catch (error) {
    console.error(`Falha na busca do TMDB:`, error);
    return [];
  }
}

// Get details for a specific movie or series
export async function getMediaDetails(id: string, type: 'movie' | 'tv'): Promise<Media | null> {
   const url = `${API_BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=pt-BR`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao buscar detalhes na API TMDB:', errorData);
        throw new Error(errorData.status_message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return normalizeMediaDetails(data, type);
  } catch (error) {
    console.error('Falha ao buscar detalhes do TMDB:', error);
    return null;
  }
}
