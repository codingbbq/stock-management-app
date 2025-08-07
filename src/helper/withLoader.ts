
import { useLoader } from '@/lib/LoaderContext';

export function useWithLoader() {
  const { showLoader, hideLoader } = useLoader();

  return async <T>(message: string = "Loading...", fn: () => Promise<T>): Promise<T> => {
    showLoader(message);
    try {
      return await fn();
    } finally {
      hideLoader();
    }
  };
}