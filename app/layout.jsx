import './globals.css';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Form',
  description: 'Form for choosing sectors you are involved in.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`relative flex justify-between min-h-screen min-w-[360px] flex-col ${roboto.className}`}>
        <Header />
        {children}
        <Footer />
        <Toaster position="right-bottom" toastOptions={{ duration: 4000 }} />
      </body>
    </html>
  );
}
