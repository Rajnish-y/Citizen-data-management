import React, { useState } from 'react';
import { UserPlus, UserMinus, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useGrantAccess, useRevokeAccess, useGetAccessList } from '../hooks/useContract';
import { formatAddress } from '../utils/format';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

export function AccessControl() {
  const [addressInput, setAddressInput] = useState('');
  const { address } = useAccount();
  
  const { grantAccess, isLoading: isGranting, isConfirming: isGrantConfirming, isSuccess: isGrantSuccess } = useGrantAccess();
  const { revokeAccess, isLoading: isRevoking, isConfirming: isRevokeConfirming, isSuccess: isRevokeSuccess } = useRevokeAccess();
  const { accessList, refetch } = useGetAccessList(address);

  React.useEffect(() => {
    if (isGrantSuccess) {
      toast.success('Access granted successfully!');
      setAddressInput('');
      refetch();
    }
  }, [isGrantSuccess, refetch]);

  React.useEffect(() => {
    if (isRevokeSuccess) {
      toast.success('Access revoked successfully!');
      refetch();
    }
  }, [isRevokeSuccess, refetch]);

  const handleGrantAccess = async () => {
    if (!addressInput) {
      toast.error('Please enter an address');
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(addressInput)) {
      toast.error('Invalid Ethereum address');
      return;
    }

    try {
      await grantAccess(addressInput);
    } catch (error) {
      console.error('Grant access error:', error);
      toast.error(error.message || 'Failed to grant access');
    }
  };

  const handleRevokeAccess = async (userAddress) => {
    try {
      await revokeAccess(userAddress);
    } catch (error) {
      console.error('Revoke access error:', error);
      toast.error(error.message || 'Failed to revoke access');
    }
  };

  const isProcessing = isGranting || isGrantConfirming || isRevoking || isRevokeConfirming;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Shield className="text-blue-600" size={24} />
            Access Control
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Grant Access Form */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Grant Access to User
            </h4>
            <div className="flex gap-2">
              <Input
                placeholder="Enter Ethereum address (0x...)"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleGrantAccess}
                disabled={!addressInput || isProcessing}
                loading={isGranting || isGrantConfirming}
                variant="success"
              >
                <UserPlus size={18} />
                Grant
              </Button>
            </div>
          </div>

          {/* Access List */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Users with Access ({accessList?.length || 0})
            </h4>
            <div className="space-y-2">
              {accessList && accessList.length > 0 ? (
                accessList.map((addr) => (
                  <div
                    key={addr}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-mono text-sm text-gray-900 dark:text-white">
                        {addr}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatAddress(addr)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRevokeAccess(addr)}
                      disabled={isProcessing}
                      loading={isRevoking || isRevokeConfirming}
                    >
                      <UserMinus size={16} />
                      Revoke
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No users have access yet
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
