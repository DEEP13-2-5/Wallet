import React from 'react';
import { Wallet } from 'lucide-react';
import WalletConnect from './WalletConnect';
import ThemeToggle from './ThemeToggle';
import { useWallet } from '../context/WalletContext';
import NetworkBadge from './NetworkBadge';

const Header: React.FC = () => {
  const { isConnected, network } = useWallet();

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Wallet className="text-primary-600 dark:text-primary-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Web3 Wallet Dashboard
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {isConnected && network && (
            <NetworkBadge network={network} />
          )}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;