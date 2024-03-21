// import { ethers, providers } from "ethers";
import { Provider, types } from "zksync-ethers";
// import { AbiHoldstaking__factory } from "./contract/factories/AbiHoldstaking__factory";

export async function ZkCheckBalance(addressCheck) {
  const divider = 1000000000000000000;

  const provider = Provider.getDefaultProvider(types.Network.Mainnet);

  const account = addressCheck;
  const holdAddress = "0xed4040fD47629e7c8FBB7DA76bb50B3e7695F0f2";
  const usdcAddress = "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4";

  const get_ETHBalance = await provider.getBalance(account);
  const get_HOLDBalance = await provider.getBalance(
    account,
    "latest",
    holdAddress
  );

  const get_USDCBalance = await provider.getBalance(
    account,
    "latest",
    usdcAddress
  );

  // const contract = AbiHoldstaking__factory.connect(
  //   "0x7cF68AA037c67B6dae9814745345FFa9FC7075b1",
  //   provider
  // );

  // console.log(await contract.currentEpoch());

  const ETHBalance = Number(get_ETHBalance) / divider;
  const HOLDBalance = Number(get_HOLDBalance) / divider;
  const USDCBalance = Number(get_USDCBalance) / 1000000;
  return { account, ETHBalance, HOLDBalance, USDCBalance };
}
