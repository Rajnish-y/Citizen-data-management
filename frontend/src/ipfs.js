import axios from "axios";

// Load JWT from .env file
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;

export async function uploadToPinata(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${PINATA_JWT}`, // pulled from .env
    },
  });

  return res.data.IpfsHash; // ✅ CID returned by Pinata
}

// api secret 1480bb1b1d515f37410fd3f8a54c2411f040e0d6aad24549a96b3dde28eb8ba6
//api key  124d163570d738cb47e7