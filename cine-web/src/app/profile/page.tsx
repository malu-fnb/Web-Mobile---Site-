'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { SavedMedia } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Pencil, Star, Trash2 } from 'lucide-react';
import { EditProfileItemDialog } from '@/components/app/edit-profile-item-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfile } from '@/context/profile-context';
import { MovieCard } from '@/components/app/movie-card';

function SavedItemsList() {
  const { savedItems, updateSavedItem, removeSavedItem } = useProfile();
  const [editingItem, setEditingItem] = useState<SavedMedia | null>(null);

  const handleUpdateStatus = (tmdbId: string) => {
    const item = savedItems.find((i) => i.tmdbId === tmdbId);
    if (item) {
      updateSavedItem({
        ...item,
        status: item.status === 'pending' ? 'watched' : 'pending',
      });
    }
  };

  const handleSaveChanges = (updatedItem: SavedMedia) => {
    updateSavedItem(updatedItem);
    setEditingItem(null);
  };

  if (savedItems.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-8">
        Sua lista de itens salvos está vazia.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {savedItems.map((item) => (
          <Card key={item.tmdbId} className="flex flex-col">
            <CardHeader className="flex-row gap-4 items-start p-4">
              <Image
                src={item.posterUrl}
                alt={`Pôster de ${item.title}`}
                width={100}
                height={150}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-sm text-muted-foreground">{item.year}</p>
                <Badge
                  variant={item.status === 'watched' ? 'default' : 'secondary'}
                  className="mt-2"
                >
                  {item.status === 'watched' ? (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <Clock className="mr-1 h-3 w-3" />
                  )}
                  {item.status === 'watched' ? 'Assistido' : 'Pendente'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-0">
              {item.userRating && (
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-lg">{item.userRating}</span>
                  <span className="text-sm text-muted-foreground">/ 10</span>
                </div>
              )}
              {item.notes && (
                <p className="text-sm text-foreground/80 italic border-l-2 border-primary pl-3">
                  {item.notes}
                </p>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button
                variant="ghost"
                onClick={() => handleUpdateStatus(item.tmdbId)}
              >
                Mudar Status
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingItem(item)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remover</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Isso removerá permanentemente "{item.title}" da sua
                        lista.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => removeSavedItem(item.tmdbId)}
                      >
                        Remover
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {editingItem && (
        <EditProfileItemDialog
          item={editingItem}
          isOpen={!!editingItem}
          setIsOpen={() => setEditingItem(null)}
          onSave={handleSaveChanges}
        />
      )}
    </>
  );
}

export default function ProfilePage() {
  const { likedItems, dislikedItems } = useProfile();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline text-primary text-center">
        Minha Lista
      </h1>

      <Tabs defaultValue="saved" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="saved">Salvos</TabsTrigger>
          <TabsTrigger value="liked">Gostei</TabsTrigger>
          <TabsTrigger value="disliked">Não Gostei</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="mt-6">
          <SavedItemsList />
        </TabsContent>
        
        <TabsContent value="liked" className="mt-6">
          {likedItems.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Você ainda não curtiu nenhum item.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {likedItems.map((media) => (
                <MovieCard key={media.tmdbId} media={media} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="disliked" className="mt-6">
          {dislikedItems.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Você ainda não marcou nenhum item como "não gostei".
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {dislikedItems.map((media) => (
                <MovieCard key={media.tmdbId} media={media} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
