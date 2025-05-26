import React from 'react';
import { Github, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 py-6 text-gray-600 dark:border-gray-800 dark:text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <div>
            <p>&copy; {new Date().getFullYear()} Web3 Wallet Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://ethereum.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <Globe size={16} />
              <span>Ethereum.org</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;