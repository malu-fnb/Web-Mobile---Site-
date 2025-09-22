import { notFound } from 'next/navigation';
import { getMediaDetails } from '@/lib/tmdb';
import { MediaDetails } from '@/components/app/media-details';

export default async function MediaDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [type, tmdbId] = params.id.split('-');

  if (!type || !tmdbId || (type !== 'movie' && type !== 'tv')) {
    notFound();
  }

  const media = await getMediaDetails(tmdbId, type as 'movie' | 'tv');

  if (!media) {
    notFound();
  }

  return <MediaDetails media={media} />;
}
