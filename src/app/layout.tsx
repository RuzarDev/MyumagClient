'use client'
// app/layout.tsx
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <Provider store={store}>
      {children}
    </Provider>
    </body>
    </html>
  );
}
