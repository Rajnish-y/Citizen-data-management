// Contract Address - deployed on Sepolia
export const CONTRACT_ADDRESS = "0xD6D53323b7653CFAFE79819e41b297499E77f499";

// Document Categories
export const DOCUMENT_CATEGORIES = [
  { value: "healthcare", label: "Healthcare", color: "blue" },
  { value: "education", label: "Education", color: "green" },
  { value: "finance", label: "Finance", color: "purple" },
];

// Chain IDs
export const SEPOLIA_CHAIN_ID = 11155111;
export const MAINNET_CHAIN_ID = 1;

// IPFS Gateway
export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";

// Pinata JWT from environment
export const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
