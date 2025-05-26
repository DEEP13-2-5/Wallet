import { ETH_DISPLAY_DECIMALS, TOKEN_DISPLAY_DECIMALS } from './constants';

/**
 * Formats the wallet address to show only the first and last few characters
 */
export const formatAddress = (address: string | null): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Formats the ETH balance to a human-readable string with specified decimals
 */
export const formatEthBalance = (
  balance: string | null,
  decimals: number = ETH_DISPLAY_DECIMALS
): string => {
  if (!balance) return '0.00';
  const num = parseFloat(balance);
  return num.toFixed(decimals);
};

/**
 * Formats the token balance to a human-readable string with specified decimals
 */
export const formatTokenBalance = (
  balance: string | null,
  decimals: number = TOKEN_DISPLAY_DECIMALS
): string => {
  if (!balance) return '0.00';
  const num = parseFloat(balance);
  return num.toFixed(decimals);
};

/**
 * Formats the network name with a fallback for unknown networks
 */
export const formatNetworkName = (name: string | null): string => {
  if (!name) return 'Unknown Network';
  return name;
};