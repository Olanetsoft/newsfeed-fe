import ContractAbi from "./newsFeed.json";
import { ethers } from "ethers";

export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(
    "0xa8BB60701670A91b693eb119EacCb0fe4D53Ac6b"
  );
  let contract = new ethers.Contract(
    "0x385c3494C8FBE18F952032230d6618D2911E85cc",
    ContractAbi.abi,
    signer
  );
  return contract;
}
