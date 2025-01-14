import "@/styles/globals.css";
import Header from '/components/header';
import { ThemeProvider } from '@/context/ThemeContext';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200"> 
        <Header />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}