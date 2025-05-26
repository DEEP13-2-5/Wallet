import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WalletDashboard from './components/WalletDashboard';
import { ThemeProvider } from './context/ThemeContext';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
          <Header />
          
          <main className="flex flex-1 flex-col items-center justify-center p-6">
            <WalletDashboard />
          </main>
          
          <Footer />
        </div>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;