# Modern UI Implementation with Wagmi v2

This document describes the modern UI implementation for the Citizen Data Management system with Wagmi v2 integration.

## Overview

The implementation provides a complete, production-ready modern UI with the following features:

- **Wagmi v2 Integration**: Complete Web3 wallet connection setup with multi-chain support
- **Modern UI Components**: Reusable, responsive components with Tailwind CSS
- **Dark/Light Theme**: User-toggleable theme with persistence
- **IPFS Integration**: Document upload and retrieval via Pinata
- **Smart Contract Hooks**: Custom hooks for all contract interactions
- **Responsive Design**: Mobile-first approach with beautiful UI

## Architecture

### Directory Structure

```
frontend/src/
├── config/
│   ├── wagmi.js          # Wagmi configuration and connectors
│   ├── abi.js            # Smart contract ABI
│   └── constants.js      # Application constants
├── hooks/
│   └── useContract.js    # Custom hooks for contract interactions
├── utils/
│   ├── format.js         # Formatting utilities
│   └── ipfs.js           # IPFS upload/download functions
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Loading.jsx
│   ├── Header.jsx        # Main header with wallet connect
│   ├── WalletConnect.jsx # Wallet connection component
│   ├── DocumentCard.jsx  # Document display card
│   ├── UploadModal.jsx   # Document upload modal
│   └── AccessControl.jsx # Access management component
└── pages/
    ├── CitizenDashboard.jsx
    └── AuthorityDashboard.jsx
```

## Key Features

### 1. Wagmi v2 Integration

The implementation uses Wagmi v2 for Web3 interactions with:

- **Multiple Connectors**: MetaMask (Injected), WalletConnect, Coinbase Wallet
- **Multi-chain Support**: Ethereum Mainnet and Sepolia Testnet
- **React Query Integration**: For efficient data fetching and caching
- **Type-safe Hooks**: Custom hooks wrapping Wagmi's core functionality

#### Configuration (`src/config/wagmi.js`)

```javascript
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
  chains: [sepolia, mainnet],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'Citizen Data Management' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
```

### 2. Custom Contract Hooks

All smart contract interactions are abstracted into custom hooks in `src/hooks/useContract.js`:

- `useUploadDocument()` - Upload documents to blockchain
- `useGetDocuments()` - Fetch user documents
- `useGrantAccess()` - Grant access to another address
- `useRevokeAccess()` - Revoke access from an address
- `useGetAccessList()` - Get list of addresses with access
- `useCheckAccess()` - Check if an address has access

Example usage:

```javascript
const { uploadDocument, isLoading, isSuccess } = useUploadDocument();

// Upload a document
await uploadDocument(cid, category);
```

### 3. IPFS Integration

IPFS functionality is handled through Pinata API in `src/utils/ipfs.js`:

- `uploadToIPFS(file)` - Upload file and get CID
- `getIPFSUrl(cid)` - Get IPFS gateway URL
- `downloadFromIPFS(cid, filename)` - Download file from IPFS

### 4. UI Components

All UI components are built with Tailwind CSS and support dark mode:

#### Button Component
Variants: primary, secondary, success, danger, outline
Sizes: sm, md, lg
Loading states and disabled states

#### Card Component
Flexible card component with header, title, and content sections

#### Input Components
- Text inputs with labels and error states
- Select dropdowns
- File inputs with custom styling

#### Modal Component
Responsive modal with backdrop and configurable sizes

### 5. Theme Support

Dark/light theme toggle with localStorage persistence:

```javascript
const [darkMode, setDarkMode] = React.useState(false);

const toggleDarkMode = () => {
  const newMode = !darkMode;
  setDarkMode(newMode);
  localStorage.setItem('darkMode', newMode.toString());
  document.documentElement.classList.toggle('dark', newMode);
};
```

## Component Details

### CitizenDashboard

**Features:**
- Document upload with IPFS integration
- Document viewing by category
- Access control management (grant/revoke)
- Statistics overview
- Responsive grid layout

**Key Sections:**
1. Stats Overview - Display total documents, access status, current category
2. Documents Section - Grid of document cards with view/download
3. Access Control Sidebar - Manage who can access documents

### AuthorityDashboard

**Features:**
- Search citizen documents by address
- Category filtering
- Access-controlled document viewing
- Error handling for unauthorized access

**Key Sections:**
1. Info Banner - Authority access explanation
2. Search Section - Input for citizen address and category selection
3. Results Section - Display documents if access granted

## Setup and Configuration

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_PINATA_JWT=your_pinata_jwt_here
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## Styling

The implementation uses:

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: citizenBlue (#2b6cb0) and authorityGreen (#16a34a)
- **Dark Mode**: Class-based dark mode strategy
- **Responsive Design**: Mobile-first breakpoints

## Transaction Flow

### Document Upload Flow

1. User selects file from file input
2. File is uploaded to IPFS via Pinata
3. IPFS CID is returned
4. Transaction is sent to smart contract with CID
5. User confirms transaction in wallet
6. Transaction is confirmed on blockchain
7. Document list is refreshed

### Access Control Flow

1. User enters Ethereum address
2. Transaction is sent to grant/revoke access
3. User confirms in wallet
4. Transaction is confirmed
5. Access list is refreshed

## Error Handling

All components include proper error handling:

- Network errors
- Transaction rejections
- Invalid inputs
- Access denied scenarios
- Loading states during async operations

## Notifications

Toast notifications using `react-toastify` for:

- Success messages
- Error messages
- Transaction confirmations
- Copy to clipboard feedback

## Best Practices Followed

1. **Component Composition**: Small, reusable components
2. **Separation of Concerns**: Logic separated into hooks and utilities
3. **Type Safety**: Proper prop validation
4. **Performance**: React Query for caching, memoization where needed
5. **Accessibility**: Proper ARIA labels and semantic HTML
6. **User Experience**: Loading states, error messages, confirmation feedback
7. **Responsive Design**: Mobile-first approach with breakpoints

## Future Enhancements

Potential improvements for future iterations:

1. Document preview functionality
2. Batch operations for multiple documents
3. Activity history and logs
4. User profile management
5. Advanced search and filtering
6. Document encryption
7. Multi-language support
8. Analytics dashboard

## Dependencies

### Production Dependencies
- `wagmi`: ^2.13.9
- `viem`: ^2.21.60
- `@tanstack/react-query`: ^5.64.2
- `react-toastify`: ^11.0.5
- `lucide-react`: ^0.468.0
- `axios`: ^1.11.0

### Development Dependencies
- `tailwindcss`: ^4.1.12
- `vite`: ^7.1.2
- `@vitejs/plugin-react`: ^5.0.0

## Screenshots

See the `screenshots/` directory for UI screenshots demonstrating:

1. Landing page with 3D animation
2. Wallet connection interface
3. Citizen dashboard with documents
4. Dark mode theme
5. Authority dashboard

## Support

For issues or questions, please refer to:

- Wagmi documentation: https://wagmi.sh
- Viem documentation: https://viem.sh
- TanStack Query: https://tanstack.com/query

## License

This implementation follows the license of the main project.
