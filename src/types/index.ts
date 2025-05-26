// Network types
export interface Network {
  name: string;
  chainId: number;
}

// Wallet types
export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  ensName: string | null;
  ethBalance: string | null;
  daiBalance: string | null;
  network: Network | null;
  error: string | null;
}

export interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalances: () => Promise<void>;
}

// Theme types
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}