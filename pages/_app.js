import "@/styles/globals.css";
import '../styles/style.css';
import Header from './header';
import { ThemeProvider } from '@/context/ThemeContext';  // Note the @ symbol

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200"> 
        <Header/>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}