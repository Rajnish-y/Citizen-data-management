import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Upload, FileText, Users, RefreshCw } from 'lucide-react';
import { Header } from '../components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Input';
import { DocumentCard } from '../components/DocumentCard';
import { UploadModal } from '../components/UploadModal';
import { AccessControl } from '../components/AccessControl';
import { LoadingScreen } from '../components/ui/Loading';
import { useGetDocuments } from '../hooks/useContract';
import { DOCUMENT_CATEGORIES } from '../config/constants';

function CitizenDashboard() {
  const { address, isConnected } = useAccount();
  const [category, setCategory] = useState('healthcare');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const { documents, isLoading, refetch } = useGetDocuments(address, category);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header title="Citizen Dashboard" />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Please connect your wallet to access your dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Citizen Dashboard" />

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 py-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText className="text-blue-600 dark:text-blue-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {documents?.length || 0}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 py-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Users className="text-green-600 dark:text-green-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Shared Access</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Active</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 py-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Upload className="text-purple-600 dark:text-purple-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                  {category}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Documents Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Documents</CardTitle>
                  <div className="flex items-center gap-3">
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-40"
                    >
                      {DOCUMENT_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </Select>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => refetch()}
                      disabled={isLoading}
                    >
                      <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setUploadModalOpen(true)}
                    >
                      <Upload size={16} />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
                  </div>
                ) : documents && documents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((cid, idx) => (
                      <DocumentCard key={idx} cid={cid} category={category} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No documents found in this category
                    </p>
                    <Button onClick={() => setUploadModalOpen(true)}>
                      <Upload size={18} />
                      Upload Your First Document
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Access Control Sidebar */}
          <div>
            <AccessControl />
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSuccess={() => refetch()}
      />
    </div>
  );
}

export default CitizenDashboard;
