'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Media, SavedMedia } from '@/lib/types';
import { mockSavedItems } from '@/lib/data';

interface ProfileContextType {
  savedItems: SavedMedia[];
  likedItems: Media[];
  dislikedItems: Media[];
  addSavedItem: (item: Media) => void;
  updateSavedItem: (item: SavedMedia) => void;
  removeSavedItem: (id: string) => void;
  addLikedItem: (item: Media) => void;
  removeLikedItem: (id: string) => void;
  addDislikedItem: (item: Media) => void;
  removeDislikedItem: (id: string) => void;
  isSaved: (id: string) => boolean;
  isLiked: (id: string) => boolean;
  isDisliked: (id: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedMedia[]>(mockSavedItems);
  const [likedItems, setLikedItems] = useState<Media[]>([]);
  const [dislikedItems, setDislikedItems] = useState<Media[]>([]);

  const addSavedItem = (item: Media) => {
    if (savedItems.some((i) => i.id === item.id)) return;
    const newSavedItem: SavedMedia = {
      ...item,
      status: 'pending',
      userRating: null,
      notes: null,
    };
    setSavedItems((prev) => [newSavedItem, ...prev]);
  };

  const updateSavedItem = (item: SavedMedia) => {
    setSavedItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
  };

  const removeSavedItem = (id: string) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
  };
  
  const addLikedItem = (item: Media) => {
    if (likedItems.some((i) => i.id === item.id)) return;
    setLikedItems((prev) => [item, ...prev]);
  };

  const removeLikedItem = (id: string) => {
    setLikedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addDislikedItem = (item: Media) => {
    if (dislikedItems.some((i) => i.id === item.id)) return;
    setDislikedItems((prev) => [item, ...prev]);
  };
    
  const removeDislikedItem = (id: string) => {
    setDislikedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isSaved = (id: string) => savedItems.some((i) => i.id === id);
  const isLiked = (id: string) => likedItems.some((i) => i.id === id);
  const isDisliked = (id: string) => dislikedItems.some((i) => i.id === id);

  return (
    <ProfileContext.Provider
      value={{
        savedItems,
        likedItems,
        dislikedItems,
        addSavedItem,
        updateSavedItem,
        removeSavedItem,
        addLikedItem,
        removeLikedItem,
        addDislikedItem,
        removeDislikedItem,
        isSaved,
        isLiked,
        isDisliked,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
