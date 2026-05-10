import React, { createContext, useContext, ReactNode } from 'react';
import { usePortfolioContent, ContentMap } from '../hooks/usePortfolioContent';

interface ContentContextType {
  img: (id: string) => string;
  txt: (id: string) => string;
  images: ContentMap;
  content: ContentMap;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const value = usePortfolioContent();
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useContent must be used inside ContentProvider');
  }
  return ctx;
}
