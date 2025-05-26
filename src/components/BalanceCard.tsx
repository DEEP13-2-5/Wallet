import React from 'react';
import { RefreshCw } from 'lucide-react';
import { formatEthBalance, formatTokenBalance } from '../utils/formatters';

interface BalanceCardProps {
  label: string;
  balance: string | null;
  symbol: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  icon?: React.ReactNode;
  type?: 'eth' | 'token';
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  label,
  balance,
  symbol,
  isLoading = false,
  onRefresh,
  icon,
  type = 'eth'
}) => {
  const formattedBalance = type === 'eth' 
    ? formatEthBalance(balance)
    : formatTokenBalance(balance);

  return (
    <div className="glass-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary-500 dark:text-primary-400">{icon}</div>}
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
        </div>
        {onRefresh && (
          <button 
            onClick={onRefresh}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            aria-label="Refresh balance"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        )}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold tracking-tight">
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <>
              {formattedBalance} <span className="text-lg">{symbol}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default BalanceCard;