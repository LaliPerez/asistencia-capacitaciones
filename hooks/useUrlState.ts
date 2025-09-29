
import { useState, useEffect, useCallback } from 'react';
import { type Link } from '../types';

const useUrlState = (initialState: Link[]): [Link[], (value: React.SetStateAction<Link[]>) => void] => {
  const [state, setState] = useState<Link[]>(() => {
    try {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const decoded = atob(hash);
        const parsed = JSON.parse(decoded);
        if (Array.isArray(parsed)) {
            return parsed.map(item => ({...item, isLoading: false}));
        }
      }
    } catch (error) {
      console.error("Failed to parse state from URL hash", error);
    }
    return initialState;
  });

  useEffect(() => {
    try {
      // We remove the isLoading property before saving to the URL
      const stateToSave = state.map(({ isLoading, ...rest }) => rest);
      const jsonState = JSON.stringify(stateToSave);
      const encodedState = btoa(jsonState);
      
      if (state.length > 0) {
        window.history.replaceState(null, '', '#' + encodedState);
      } else {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch (error) {
      console.error("Failed to update URL hash with state", error);
    }
  }, [state]);

  return [state, setState];
};

export default useUrlState;
