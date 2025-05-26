// Network names mapping
export const NETWORK_NAMES: Record<number, string> = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet',
  137: 'Polygon Mainnet',
  80001: 'Mumbai Testnet',
  42161: 'Arbitrum One',
  421613: 'Arbitrum Goerli',
  10: 'Optimism',
  420: 'Optimism Goerli',
  56: 'BNB Smart Chain',
  97: 'BNB Testnet',
  43114: 'Avalanche C-Chain',
  43113: 'Avalanche Fuji Testnet',
  250: 'Fantom Opera',
  4002: 'Fantom Testnet'
};

// DAI token addresses by network
export const DAI_TOKEN_ADDRESSES: Record<number, string> = {
  1: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // Mainnet
  5: '0x73967c6a0904aA032C103b4104747E88c566B1A2', // Goerli
  11155111: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', // Sepolia (this is actually LINK, as DAI might not be available)
  137: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // Polygon
};

// ERC20 ABI for token interactions
export const ERC20_ABI = [
  // Read-only functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  
  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)'
];

// Number of decimals to display for ETH balance
export const ETH_DISPLAY_DECIMALS = 4;

// Number of decimals to display for token balances
export const TOKEN_DISPLAY_DECIMALS = 2;

// Auto refresh interval in milliseconds (30 seconds)
export const REFRESH_INTERVAL = 30000;