import React from 'react';
import { Copy, Check, User } from 'lucide-react';
import { formatAddress } from '../utils/formatters';

interface AddressDisplayProps {
  address: string;
  ensName: string | null;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ address, ensName }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address: ', err);
    }
  };

  return (
    <div className="glass-card">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
          <User size={16} />
        </div>
        <div className="flex-1">
          {ensName && (
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {ensName}
            </h3>
          )}
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatAddress(address)}
            </p>
            <button
              onClick={copyToClipboard}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              aria-label="Copy address"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDisplay;