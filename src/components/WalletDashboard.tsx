import React from 'react';
import { useWallet } from '../context/WalletContext';
import NetworkBadge from './NetworkBadge';
import BalanceCard from './BalanceCard';
import AddressDisplay from './AddressDisplay';
import NotConnectedState from './NotConnectedState';
import { Coins, CreditCard, RefreshCcw } from 'lucide-react';

const WalletDashboard: React.FC = () => {
  const { 
    isConnected, 
    address, 
    ensName, 
    ethBalance, 
    daiBalance, 
    network,
    refreshBalances
  } = useWallet();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBalances();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (!isConnected || !address) {
    return <NotConnectedState />;
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Wallet Dashboard
        </h2>
        {network && <NetworkBadge network={network} />}
      </div>

      <AddressDisplay address={address} ensName={ensName} />
      
      <div className="grid gap-4 md:grid-cols-2">
        <BalanceCard
          label="ETH Balance"
          balance={ethBalance}
          symbol="ETH"
          isLoading={isRefreshing}
          onRefresh={handleRefresh}
          icon={<Coins size={18} />}
          type="eth"
        />
        
        <BalanceCard
          label="DAI Balance"
          balance={daiBalance}
          symbol="DAI"
          isLoading={isRefreshing}
          onRefresh={handleRefresh}
          icon={<CreditCard size={18} />}
          type="token"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleRefresh}
          className="button-secondary"
          disabled={isRefreshing}
        >
          <RefreshCcw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          Refresh Balances
        </button>
      </div>
    </div>
  );
};

export default WalletDashboard;