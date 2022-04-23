import ContractAbi from "./newsFeed.json";
import { ethers } from "ethers";

export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(
    "0xC1dA872DFFd58dB46a1E75635Bf15F5b511C3e23",
    ContractAbi.abi,
    signer
  );
  return contract;
}
