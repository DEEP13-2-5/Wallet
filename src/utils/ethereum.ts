import { ethers } from 'ethers';
import { DAI_TOKEN_ADDRESSES, ERC20_ABI, NETWORK_NAMES } from './constants';
import { Network } from '../types';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask);
};

export const getProvider = (): ethers.BrowserProvider | null => {
  if (!isMetaMaskInstalled()) return null;
  return new ethers.BrowserProvider(window.ethereum);
};

export const connectWallet = async (): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    throw new Error('Please install MetaMask to connect your wallet');
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }

    return accounts[0];
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('Please accept the connection request in MetaMask');
    }
    throw new Error('Failed to connect wallet');
  }
};

export const getNetwork = async (): Promise<Network | null> => {
  const provider = getProvider();
  if (!provider) return null;

  try {
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    const name = NETWORK_NAMES[chainId] || `Chain ID: ${chainId}`;
    
    return {
      name,
      chainId,
    };
  } catch (error) {
    console.error('Error getting network:', error);
    return null;
  }
};

export const getEthBalance = async (address: string): Promise<string | null> => {
  if (!address) return null;
  
  const provider = getProvider();
  if (!provider) return null;

  try {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error getting ETH balance:', error);
    return null;
  }
};

export const getDaiBalance = async (
  address: string,
  chainId: number
): Promise<string | null> => {
  if (!address) return null;
  
  const provider = getProvider();
  if (!provider) return null;

  const tokenAddress = DAI_TOKEN_ADDRESSES[chainId];
  if (!tokenAddress) return null;

  try {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const balance = await tokenContract.balanceOf(address);
    const decimals = await tokenContract.decimals();
    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    console.error('Error getting DAI balance:', error);
    return null;
  }
};

export const getEnsName = async (address: string): Promise<string | null> => {
  if (!address) return null;
  
  const provider = getProvider();
  if (!provider) return null;

  try {
    const network = await provider.getNetwork();
    if (Number(network.chainId) !== 1) return null;
    
    const ensName = await provider.lookupAddress(address);
    return ensName;
  } catch (error) {
    console.error('Error getting ENS name:', error);
    return null;
  }
};

export const addAccountsChangedListener = (callback: (accounts: string[]) => void): void => {
  if (!isMetaMaskInstalled()) return;
  window.ethereum.on('accountsChanged', callback);
};

export const addChainChangedListener = (callback: (chainId: string) => void): void => {
  if (!isMetaMaskInstalled()) return;
  window.ethereum.on('chainChanged', callback);
};

export const removeAccountsChangedListener = (callback: (accounts: string[]) => void): void => {
  if (!isMetaMaskInstalled()) return;
  window.ethereum.removeListener('accountsChanged', callback);
};

export const removeChainChangedListener = (callback: (chainId: string) => void): void => {
  if (!isMetaMaskInstalled()) return;
  window.ethereum.removeListener('chainChanged', callback);
};