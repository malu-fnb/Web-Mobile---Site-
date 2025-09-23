'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import type { Media, SavedMedia } from '@/lib/types';

interface ProfileContextType {
  savedItems: SavedMedia[];
  likedItems: Media[];
  dislikedItems: Media[];
  addSavedItem: (item: Media) => void;
  updateSavedItem: (item: SavedMedia) => void;
  removeSavedItem: (tmdbId: string) => void;
  addLikedItem: (item: Media) => void;
  removeLikedItem: (tmdbId: string) => void;
  addDislikedItem: (item: Media) => void;
  removeDislikedItem: (tmdbId: string) => void;
  isSaved: (tmdbId: string) => boolean;
  isLiked: (tmdbId: string) => boolean;
  isDisliked: (tmdbId: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Helper function to get items from localStorage
const getStorageItem = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading localStorage key “${key}”:`, error);
    return fallback;
  }
};

// Helper function to set items in localStorage
const setStorageItem = <T,>(key: string, value: T) => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error setting localStorage key “${key}”:`, error);
  }
};

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedMedia[]>([]);
  const [likedItems, setLikedItems] = useState<Media[]>([]);
  const [dislikedItems, setDislikedItems] = useState<Media[]>([]);

  useEffect(() => {
    setSavedItems(getStorageItem('savedItems', []));
    setLikedItems(getStorageItem('likedItems', []));
    setDislikedItems(getStorageItem('dislikedItems', []));
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      setStorageItem('savedItems', savedItems);
    }
  }, [savedItems, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      setStorageItem('likedItems', likedItems);
    }
  }, [likedItems, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      setStorageItem('dislikedItems', dislikedItems);
    }
  }, [dislikedItems, isInitialized]);

  const addSavedItem = useCallback((item: Media) => {
    setSavedItems((prev) => {
      if (prev.some((i) => i.tmdbId === item.tmdbId)) return prev;
      const newSavedItem: SavedMedia = { ...item, status: 'pending', userRating: null, notes: null };
      return [newSavedItem, ...prev];
    });
  }, []);

  const updateSavedItem = useCallback((item: SavedMedia) => {
    setSavedItems((prev) => prev.map((i) => (i.tmdbId === item.tmdbId ? item : i)));
  }, []);

  const removeSavedItem = useCallback((tmdbId: string) => {
    setSavedItems((prev) => prev.filter((i) => i.tmdbId !== tmdbId));
  }, []);

  const addLikedItem = useCallback((item: Media) => {
    setLikedItems((prev) => {
      if (prev.some((i) => i.tmdbId === item.tmdbId)) return prev;
      return [item, ...prev];
    });
  }, []);

  const removeLikedItem = useCallback((tmdbId: string) => {
    setLikedItems((prev) => prev.filter((i) => i.tmdbId !== tmdbId));
  }, []);

  const addDislikedItem = useCallback((item: Media) => {
    setDislikedItems((prev) => {
      if (prev.some((i) => i.tmdbId === item.tmdbId)) return prev;
      return [item, ...prev];
    });
  }, []);

  const removeDislikedItem = useCallback((tmdbId: string) => {
    setDislikedItems((prev) => prev.filter((i) => i.tmdbId !== tmdbId));
  }, []);

  const isSaved = (tmdbId: string) => savedItems.some((i) => i.tmdbId === tmdbId);
  const isLiked = (tmdbId: string) => likedItems.some((i) => i.tmdbId === tmdbId);
  const isDisliked = (tmdbId: string) => dislikedItems.some((i) => i.tmdbId === tmdbId);

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
