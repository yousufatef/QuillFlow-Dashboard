import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import Toaster from '@/components/ui/toaster';
import { useDirection } from '../i18n/useDirection';
import { router } from './router';
import { DirectionProvider } from '@/components/ui/direction';
import { useTranslation } from 'react-i18next';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

function App() {
  useDirection();

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
    [],
  );
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';
  useNetworkStatus();

  return (
    <DirectionProvider direction={isEnglish ? 'ltr' : 'rtl'}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </DirectionProvider>
  );
}

export default App;
