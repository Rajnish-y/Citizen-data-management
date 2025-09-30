// Format Ethereum address for display (0x1234...5678)
export function formatAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Format transaction hash
export function formatTxHash(hash) {
  if (!hash) return '';
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

// Get category color
export function getCategoryColor(category) {
  const colors = {
    healthcare: 'blue',
    education: 'green',
    finance: 'purple',
  };
  return colors[category] || 'gray';
}

// Get category badge classes
export function getCategoryBadgeClasses(category) {
  const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
  const colorClasses = {
    healthcare: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    education: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    finance: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };
  return `${baseClasses} ${colorClasses[category] || 'bg-gray-100 text-gray-800'}`;
}

// Format file size
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Format date
export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
