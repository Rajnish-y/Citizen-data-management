import React from 'react';
import { File, Download, ExternalLink, Copy, Check } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { getCategoryBadgeClasses } from '../utils/format';
import { getIPFSUrl, downloadFromIPFS } from '../utils/ipfs';
import { toast } from 'react-toastify';

export function DocumentCard({ cid, category, onDownload }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cid);
    setCopied(true);
    toast.success('CID copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    try {
      await downloadFromIPFS(cid, `document-${cid}`);
      toast.success('Download started!');
    } catch (error) {
      toast.error('Failed to download document');
    }
  };

  const handleView = () => {
    window.open(getIPFSUrl(cid), '_blank');
  };

  return (
    <Card hover className="flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <File className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Document</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {cid.slice(0, 10)}...{cid.slice(-8)}
            </p>
          </div>
        </div>
        <span className={getCategoryBadgeClasses(category)}>
          {category}
        </span>
      </div>

      <div className="flex gap-2 mt-auto">
        <Button
          size="sm"
          variant="outline"
          onClick={handleView}
          className="flex-1"
        >
          <ExternalLink size={16} />
          View
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleDownload}
          className="flex-1"
        >
          <Download size={16} />
          Download
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleCopy}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </Button>
      </div>
    </Card>
  );
}
