import { useEffect, useState } from 'react';

export const useMediaQuery = (mediaQuery: string) => {
  const mediaQueryList = window.matchMedia(mediaQuery);
  const [matches, setMatches] = useState(mediaQueryList.matches);

  useEffect(() => {
    const handleMatchChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handleMatchChange);

    return () =>
      mediaQueryList.removeEventListener('change', handleMatchChange);
  }, [mediaQueryList, setMatches]);

  return matches;
};
