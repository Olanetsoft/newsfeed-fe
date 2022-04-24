import ContractAbi from "./newsFeed.json";
import { ethers } from "ethers";

export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(
    "0xD5cc2429681e148890E423Ce60768D787E77dA94",
    ContractAbi.abi,
    signer
  );
  return contract;
}
