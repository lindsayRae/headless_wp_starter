import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Headless WP Starter',
  description:
    'Edocew prides itself on being easy to work with and providing services that small to medium size businesses need. It’s our business to help your business grow!',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} `}>
        <div className='bg-[#f8f8f8] text-base dark:bg-gray-900 text-neutral-900 dark:text-neutral-200'>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
