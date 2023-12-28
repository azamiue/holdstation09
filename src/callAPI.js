import { ethers } from "ethers";
import { addAddressToLocalStorage } from "./localstorage";

// api url:
const api =
  "https://gateway.holdstation.com/services/launchpad/api/staking/wallets?list=";

// filter userinput
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function Table({ value }) {
  return (
    <div className="pt-12 w-11/12 flex justify-center">
      <table className="border-collapse border border-slate-400">
        <thead className="bg-slate-400">
          <tr>
            <th className="pl-2 pr-20 py-1 text-left">Address</th>
            <th className="px-16 py-1 text-left">Pending Reward</th>
            <th className="px-16 py-1 text-left">Harvested Reward</th>
          </tr>
        </thead>
        <tbody>
          {value.map((data, index) => (
            <tr key={index}>
              <td className="pl-2 pr-16 py-2 text-left">{data[0].address}</td>
              <td className="px-16 py-2 text-left">{data[0].pendingReward}</td>
              <td className="px-16 py-2 text-left">
                {data[0].harvestedReward}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function CallApi(address) {
  let input = address.split(",").map((item) => item.trim());
  input = input.filter(onlyUnique).filter((address) => {
    if (!ethers.isAddress(address)) {
      return false;
    } else {
      return true;
    }
  });
  for (let key in input) {
    addAddressToLocalStorage(input[key]);
  }

  const value = input.map(async (value) => {
    const res = await fetch(api + value);
    return await res.json();
  });
  return await Promise.all(value);
}

export default CallApi;
export { Table };
