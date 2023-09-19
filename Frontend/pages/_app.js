import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../styles/globals.css';
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

// Dynamic import of Navbar to avoid SSR issues
const Navbar = dynamic(() => import("../components/Navbar"), {
    ssr: false,
  });

function App({ Component, pageProps }) {
  return (
    <div suppressHydrationWarning>
      <BrowserRouter>
      <div className="bg-white dark:bg-gray-800">
          <Navbar suppressHydrationWarning/>
          <Component {...pageProps} />
          <Toaster />
        </div>
      </BrowserRouter>
    </div>
    )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});

