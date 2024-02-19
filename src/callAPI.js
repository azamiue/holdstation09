import { Provider, types } from "zksync-ethers";

export async function ZkCheckBalance(addressCheck) {
  const divider = 1000000000000000000;

  const provider = Provider.getDefaultProvider(types.Network.Mainnet);

  const account = addressCheck;
  const holdAddress = "0xed4040fD47629e7c8FBB7DA76bb50B3e7695F0f2";

  const get_ETHBalance = await provider.getBalance(account);
  const get_HOLDBalance = await provider.getBalance(
    account,
    "latest",
    holdAddress
  );

  const ETHBalance = Number(get_ETHBalance) / divider;
  const HOLDBalance = Number(get_HOLDBalance) / divider;

  return { account, ETHBalance, HOLDBalance };
}
