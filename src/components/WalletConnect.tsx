import React from 'react';
import { Wallet, WalletIcon, Download } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const WalletConnect: React.FC = () => {
  const { isConnected, isConnecting, connect, disconnect, error } = useWallet();

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  return (
    <div className="relative">
      {!isConnected ? (
        error?.includes('install MetaMask') ? (
          <button 
            className="button-primary"
            onClick={handleInstallMetaMask}
          >
            <Download size={18} />
            Install MetaMask
          </button>
        ) : (
          <button 
            className="button-primary"
            onClick={connect}
            disabled={isConnecting}
          >
            <WalletIcon size={18} />
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )
      ) : (
        <button 
          className="button-secondary"
          onClick={disconnect}
        >
          <Wallet size={18} />
          Disconnect
        </button>
      )}
      
      {error && !error.includes('install MetaMask') && (
        <div className="absolute -bottom-12 left-0 right-0 rounded-md bg-red-100 p-2 text-sm text-red-600 dark:bg-red-900/50 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;