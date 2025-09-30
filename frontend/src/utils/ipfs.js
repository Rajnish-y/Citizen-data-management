import axios from "axios";
import { PINATA_JWT, IPFS_GATEWAY } from "../config/constants";

/**
 * Upload file to IPFS via Pinata
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - IPFS CID
 */
export async function uploadToIPFS(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${PINATA_JWT}`,
        },
      }
    );

    return res.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw new Error("Failed to upload file to IPFS");
  }
}

/**
 * Get IPFS URL from CID
 * @param {string} cid - IPFS CID
 * @returns {string} - Full IPFS URL
 */
export function getIPFSUrl(cid) {
  return `${IPFS_GATEWAY}${cid}`;
}

/**
 * Download file from IPFS
 * @param {string} cid - IPFS CID
 * @param {string} filename - Filename for download
 */
export async function downloadFromIPFS(cid, filename) {
  try {
    const url = getIPFSUrl(cid);
    const response = await fetch(url);
    const blob = await response.blob();
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || cid;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading from IPFS:", error);
    throw new Error("Failed to download file from IPFS");
  }
}
