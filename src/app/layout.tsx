import type { Metadata } from 'next';
import { ThemeRegistry } from '@/theme/ThemeRegistry';
import Navbar from '@/components/navbars/Navbar';

export const metadata: Metadata = {
  title: 'SGIP',
  description: 'SGIP - Sistema de Gestión de Inversiones y Préstamos',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es">
      <body>
        <ThemeRegistry>
          <Navbar />
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
