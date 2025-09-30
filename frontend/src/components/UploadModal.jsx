import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { FileInput, Select } from './ui/Input';
import { LoadingOverlay } from './ui/Loading';
import { useUploadDocument } from '../hooks/useContract';
import { uploadToIPFS } from '../utils/ipfs';
import { DOCUMENT_CATEGORIES } from '../config/constants';
import { toast } from 'react-toastify';

export function UploadModal({ isOpen, onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('healthcare');
  const [uploading, setUploading] = useState(false);
  const [uploadStage, setUploadStage] = useState('');
  
  const { uploadDocument, isLoading, isConfirming, isSuccess } = useUploadDocument();

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('Document uploaded successfully!');
      setFile(null);
      setUploading(false);
      onSuccess?.();
      onClose();
    }
  }, [isSuccess, onClose, onSuccess]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    try {
      setUploading(true);
      
      // Step 1: Upload to IPFS
      setUploadStage('Uploading to IPFS...');
      const cid = await uploadToIPFS(file);
      toast.success(`File uploaded to IPFS: ${cid}`);

      // Step 2: Upload to blockchain
      setUploadStage('Uploading to blockchain...');
      await uploadDocument(cid, category);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload document');
      setUploading(false);
      setUploadStage('');
    }
  };

  const isProcessing = uploading || isLoading || isConfirming;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Upload Document">
        <div className="space-y-6">
          <FileInput
            label="Select File"
            onChange={handleFileChange}
            accept="*/*"
          />

          {file && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Selected file:</p>
              <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {DOCUMENT_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </Select>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={!file || isProcessing}
              loading={isProcessing}
              className="flex-1"
            >
              <Upload size={18} />
              Upload
            </Button>
          </div>
        </div>
      </Modal>

      {isProcessing && (
        <LoadingOverlay 
          message={
            uploadStage || 
            (isConfirming ? 'Confirming transaction...' : 'Processing...')
          } 
        />
      )}
    </>
  );
}
