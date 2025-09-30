import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS } from '../config/constants';
import { CITIZEN_DATA_ABI } from '../config/abi';

/**
 * Hook to upload document to blockchain
 */
export function useUploadDocument() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const uploadDocument = async (cid, category) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CITIZEN_DATA_ABI,
      functionName: 'uploadDocument',
      args: [cid, category],
    });
  };

  return {
    uploadDocument,
    isLoading: isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Hook to get documents
 */
export function useGetDocuments(owner, category) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CITIZEN_DATA_ABI,
    functionName: 'getDocuments',
    args: [owner, category],
    enabled: !!owner && !!category,
  });

  return {
    documents: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to grant access
 */
export function useGrantAccess() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const grantAccess = async (userAddress) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CITIZEN_DATA_ABI,
      functionName: 'grantAccess',
      args: [userAddress],
    });
  };

  return {
    grantAccess,
    isLoading: isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Hook to revoke access
 */
export function useRevokeAccess() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const revokeAccess = async (userAddress) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CITIZEN_DATA_ABI,
      functionName: 'revokeAccess',
      args: [userAddress],
    });
  };

  return {
    revokeAccess,
    isLoading: isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Hook to get access list
 */
export function useGetAccessList(owner) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CITIZEN_DATA_ABI,
    functionName: 'getAccessList',
    args: [owner],
    enabled: !!owner,
  });

  return {
    accessList: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to check access
 */
export function useCheckAccess(owner, user) {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CITIZEN_DATA_ABI,
    functionName: 'checkAccess',
    args: [owner, user],
    enabled: !!owner && !!user,
  });

  return {
    hasAccess: data || false,
    isLoading,
    error,
  };
}
