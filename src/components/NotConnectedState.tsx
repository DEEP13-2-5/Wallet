import React from 'react';
import { WalletIcon } from 'lucide-react';
import WalletConnect from './WalletConnect';

const NotConnectedState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="rounded-full bg-primary-100 p-4 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
        <WalletIcon size={48} />
      </div>
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Connect Your Wallet
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Connect your MetaMask wallet to view your balances and wallet information.
        </p>
        <WalletConnect />
      </div>
    </div>
  );
};

export default NotConnectedState;