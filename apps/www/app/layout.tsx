import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { M_PLUS_1p, M_PLUS_Rounded_1c } from 'next/font/google';

const mPlus1p = M_PLUS_1p({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={mPlus1p.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
