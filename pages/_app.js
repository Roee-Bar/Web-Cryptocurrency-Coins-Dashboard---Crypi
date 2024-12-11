import "@/styles/globals.css";
import '../styles/style.css';
import Header from './header';

export default function App({ Component, pageProps }) {
  return (
    <div> 
      <Header/>
      <Component {...pageProps} />
    </div>
  );
}
