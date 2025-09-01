import axios from "axios";

// ⚠️ Paste your JWT token here (not the API key/secret)
const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMWYyZDg4ZS00Nzc1LTQyYTAtOGNjOS1hMmE2MGY4NzQwZDEiLCJlbWFpbCI6InJreXBva2Vtb25AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjEyNGQxNjM1NzBkNzM4Y2I0N2U3Iiwic2NvcGVkS2V5U2VjcmV0IjoiMTQ4MGJiMWIxZDUxNWYzNzQxMGZkM2Y4YTU0YzI0MTFmMDQwZTBkNmFhZDI0NTQ5YTk2YjNkZGUyOGViOGJhNiIsImV4cCI6MTc4ODI0MTYxMH0._ZJ-6x7vkY6lHpdg322gLz9R8Erj37h7bQRBnMKDLe0";

export async function uploadToPinata(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${PINATA_JWT}`,
    },
  });

  return res.data.IpfsHash; // This is the CID
}
// api secret 1480bb1b1d515f37410fd3f8a54c2411f040e0d6aad24549a96b3dde28eb8ba6
//api key  124d163570d738cb47e7