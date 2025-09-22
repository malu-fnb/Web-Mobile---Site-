'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Check, ThumbsDown, ThumbsUp } from 'lucide-react';
import type { Media } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/context/profile-context';

interface MovieCardProps {
  media: Media;
}

export function MovieCard({ media }: MovieCardProps) {
  const { toast } = useToast();
  const { 
    isSaved, 
    isLiked, 
    isDisliked, 
    addSavedItem, 
    addLikedItem, 
    addDislikedItem,
    removeSavedItem,
    removeLikedItem,
    removeDislikedItem,
  } = useProfile();

  const saved = isSaved(media.id);
  const liked = isLiked(media.id);
  const disliked = isDisliked(media.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (saved) {
      removeSavedItem(media.id);
      toast({ title: `"${media.title}" removido da sua lista.` });
    } else {
      addSavedItem(media);
      toast({ title: `"${media.title}" salvo na sua lista!` });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (liked) {
      removeLikedItem(media.id);
    } else {
      addLikedItem(media);
      if (disliked) removeDislikedItem(media.id);
      toast({ title: `Você curtiu "${media.title}"!` });
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disliked) {
      removeDislikedItem(media.id);
    } else {
      addDislikedItem(media);
      if (liked) removeLikedItem(media.id);
      toast({ title: `Você não curtiu "${media.title}".` });
    }
  };

  return (
    <Card className="overflow-hidden transition-transform transform hover:-translate-y-1">
      <Link href={`/media/${media.type}-${media.tmdbId}`} className="block">
        <CardContent className="p-0 relative group">
          <Image
            src={media.posterUrl}
            alt={`Pôster de ${media.title}`}
            width={500}
            height={750}
            className="w-full h-auto object-cover"
            data-ai-hint={media.posterImageHint}
          />
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <Button
                variant={saved ? "default" : "secondary"}
                size="icon"
                onClick={handleSave}
                aria-label="Salvar"
              >
                {saved ? <Check /> : <Bookmark />}
              </Button>
              <Button
                variant={liked ? "default" : "secondary"}
                size="icon"
                onClick={handleLike}
                aria-label="Gostei"
              >
                <ThumbsUp />
              </Button>
              <Button
                variant={disliked ? "default" : "secondary"}
                size="icon"
                onClick={handleDislike}
                aria-label="Não Gostei"
              >
                <ThumbsDown />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex-col items-start">
          <h3 className="font-semibold text-lg truncate w-full">
            {media.title}
          </h3>
          <p className="text-sm text-muted-foreground">{media.year}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
