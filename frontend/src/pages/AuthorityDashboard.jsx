import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Search, FileText, RefreshCw, Shield } from 'lucide-react';
import { Header } from '../components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { DocumentCard } from '../components/DocumentCard';
import { useGetDocuments } from '../hooks/useContract';
import { DOCUMENT_CATEGORIES } from '../config/constants';
import { toast } from 'react-toastify';

function AuthorityDashboard() {
  const { address, isConnected } = useAccount();
  const [citizenAddress, setCitizenAddress] = useState('');
  const [queryAddress, setQueryAddress] = useState('');
  const [category, setCategory] = useState('healthcare');

  const { documents, isLoading, error, refetch } = useGetDocuments(queryAddress, category);

  const handleSearch = () => {
    if (!citizenAddress) {
      toast.error('Please enter a citizen address');
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(citizenAddress)) {
      toast.error('Invalid Ethereum address');
      return;
    }

    setQueryAddress(citizenAddress);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header title="Authority Dashboard" />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Please connect your wallet to access the authority dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Authority Dashboard" />

      <div className="container mx-auto px-4 py-8">
        {/* Info Banner */}
        <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-600 dark:text-blue-400" size={24} />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-200">
                  Authority Access
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You can view citizen documents if they have granted you access
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Citizen Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Enter citizen Ethereum address (0x...)"
                value={citizenAddress}
                onChange={(e) => setCitizenAddress(e.target.value)}
                className="flex-1"
              />
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="md:w-48"
              >
                {DOCUMENT_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </Select>
              <Button
                onClick={handleSearch}
                disabled={!citizenAddress}
                variant="primary"
              >
                <Search size={18} />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {queryAddress && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Documents for {citizenAddress.slice(0, 6)}...{citizenAddress.slice(-4)}
                </CardTitle>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={isLoading}
                >
                  <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <Shield className="mx-auto text-red-400 mb-4" size={48} />
                  <p className="text-red-600 dark:text-red-400 mb-2 font-medium">
                    Access Denied
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    You don't have permission to view these documents or the address is invalid
                  </p>
                </div>
              ) : documents && documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((cid, idx) => (
                    <DocumentCard key={idx} cid={cid} category={category} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 dark:text-gray-400">
                    No documents found in this category
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default AuthorityDashboard;
