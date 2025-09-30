import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Moon, Sun } from 'lucide-react';
import { WalletConnect } from './WalletConnect';
import { Button } from './ui/Button';

export function Header({ title, showWallet = true }) {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Check for saved theme preference or default to dark
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Home size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {showWallet && <WalletConnect />}
          </div>
        </div>
      </div>
    </header>
  );
}
