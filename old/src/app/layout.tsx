'use client';

import '../styles/index.scss';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className='page'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
