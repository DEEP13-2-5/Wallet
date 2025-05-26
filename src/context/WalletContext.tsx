import React, { createContext, useContext, useEffect, useState } from 'react';
import { WalletContextType, WalletState } from '../types';
import { 
  connectWallet, 
  getEthBalance, 
  getNetwork, 
  getDaiBalance, 
  getEnsName,
  addAccountsChangedListener,
  addChainChangedListener,
  removeAccountsChangedListener,
  removeChainChangedListener,
  isMetaMaskInstalled
} from '../utils/ethereum';
import { REFRESH_INTERVAL } from '../utils/constants';

// Initial wallet state
const initialState: WalletState = {
  isConnected: false,
  isConnecting: false,
  address: null,
  ensName: null,
  ethBalance: null,
  daiBalance: null,
  network: null,
  error: null,
};

// Create context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>(initialState);
  
  // Auto refresh balances
  useEffect(() => {
    let intervalId: number;
    
    if (walletState.isConnected && walletState.address) {
      intervalId = window.setInterval(() => {
        refreshBalances();
      }, REFRESH_INTERVAL);
    }
    
    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [walletState.isConnected, walletState.address, walletState.network]);

  // Handle account changes
  useEffect(() => {
    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnect();
      } else if (accounts[0] !== walletState.address) {
        // User switched accounts
        setWalletState((prev) => ({
          ...prev,
          address: accounts[0],
        }));
        
        // Update balances and ENS for new account
        await updateAccountData(accounts[0]);
      }
    };

    if (walletState.isConnected) {
      addAccountsChangedListener(handleAccountsChanged);
    }

    return () => {
      removeAccountsChangedListener(handleAccountsChanged);
    };
  }, [walletState.isConnected, walletState.address]);

  // Handle chain changes
  useEffect(() => {
    const handleChainChanged = async () => {
      // Update network info
      const network = await getNetwork();
      setWalletState((prev) => ({
        ...prev,
        network,
      }));
      
      // Refresh balances for new network
      if (walletState.address) {
        await updateBalances(walletState.address, network?.chainId);
      }
    };

    if (walletState.isConnected) {
      addChainChangedListener(handleChainChanged);
    }

    return () => {
      removeChainChangedListener(handleChainChanged);
    };
  }, [walletState.isConnected, walletState.address]);

  // Update account data (balances and ENS)
  const updateAccountData = async (address: string) => {
    try {
      const ensName = await getEnsName(address);
      
      setWalletState((prev) => ({
        ...prev,
        ensName,
      }));
      
      await updateBalances(address, walletState.network?.chainId);
    } catch (error) {
      console.error('Error updating account data:', error);
    }
  };

  // Update balances
  const updateBalances = async (address: string, chainId?: number) => {
    try {
      const ethBalance = await getEthBalance(address);
      
      let daiBalance = null;
      if (chainId) {
        daiBalance = await getDaiBalance(address, chainId);
      }
      
      setWalletState((prev) => ({
        ...prev,
        ethBalance,
        daiBalance,
      }));
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  };

  // Connect wallet
  const connect = async (): Promise<void> => {
    if (!isMetaMaskInstalled()) {
      setWalletState((prev) => ({
        ...prev,
        error: 'MetaMask is not installed',
      }));
      return;
    }

    try {
      setWalletState((prev) => ({
        ...prev,
        isConnecting: true,
        error: null,
      }));

      // Request accounts
      const address = await connectWallet();
      
      // Get network info
      const network = await getNetwork();
      
      // Get ENS name
      const ensName = await getEnsName(address);
      
      // Get ETH balance
      const ethBalance = await getEthBalance(address);
      
      // Get DAI balance if on a supported network
      let daiBalance = null;
      if (network?.chainId) {
        daiBalance = await getDaiBalance(address, network.chainId);
      }

      // Update state with all wallet info
      setWalletState({
        isConnected: true,
        isConnecting: false,
        address,
        ensName,
        ethBalance,
        daiBalance,
        network,
        error: null,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setWalletState({
        ...initialState,
        error: (error as Error).message || 'Failed to connect wallet',
      });
    }
  };

  // Disconnect wallet
  const disconnect = (): void => {
    setWalletState(initialState);
    localStorage.removeItem('walletConnected');
  };

  // Refresh balances
  const refreshBalances = async (): Promise<void> => {
    if (!walletState.address || !walletState.isConnected) return;
    
    try {
      await updateBalances(walletState.address, walletState.network?.chainId);
    } catch (error) {
      console.error('Error refreshing balances:', error);
    }
  };

  // Context value
  const value: WalletContextType = {
    ...walletState,
    connect,
    disconnect,
    refreshBalances,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

// Custom hook for using wallet context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};