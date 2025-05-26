import React from 'react';
import { Network } from '../types';

interface NetworkBadgeProps {
  network: Network | null;
}

const getNetworkColor = (chainId: number | undefined): string => {
  // Return color classes based on chain ID
  if (!chainId) return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  
  switch (chainId) {
    case 1: // Ethereum Mainnet
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 5: // Goerli
    case 11155111: // Sepolia
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 137: // Polygon
    case 80001: // Mumbai
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    case 10: // Optimism
    case 420: // Optimism Goerli
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 42161: // Arbitrum
    case 421613: // Arbitrum Goerli
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 56: // BSC
    case 97: // BSC Testnet
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    default:
      return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

const NetworkBadge: React.FC<NetworkBadgeProps> = ({ network }) => {
  if (!network) return null;

  const colorClasses = getNetworkColor(network.chainId);

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${colorClasses}`}>
      {network.name}
    </span>
  );
};

export default NetworkBadge;