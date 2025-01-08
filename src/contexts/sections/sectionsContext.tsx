'use client';
//criar context api service
import { useSearchParams } from 'next/navigation';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';

export type ISections = 'aboutme' | 'main' | 'contact';

interface SectionsContextData {
  currentSection: ISections;
  previousSection: ISections;
}

const SectionsContext = createContext({} as SectionsContextData);

export const SectionsProvider = ({ children }: { children: ReactElement }) => {
  const [previousSection, setPreviousSection] = useState<ISections>('main');
  const [currentSection, setCurrentSection] = useState<ISections>('main');
  const searchParams = useSearchParams();

  useEffect(() => {
    const paramSection = searchParams.get('sections')?.toString();
    if (
      paramSection &&
      (paramSection === 'aboutme' || paramSection === 'main' || paramSection === 'contact')
    ) {
      setPreviousSection(currentSection);
      setCurrentSection(paramSection);
    } else {
      setPreviousSection(currentSection);
      setCurrentSection('main');
    }
  }, [searchParams]);

  return (
    <SectionsContext.Provider value={{ currentSection, previousSection }}>
      {children}
    </SectionsContext.Provider>
  );
};

export function useSections() {
  const context = useContext(SectionsContext);

  return context;
}

export default SectionsContext;
