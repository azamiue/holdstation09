import { useEffect, useState } from "react";
import { ZkCheckBalance } from "./callAPI";
import search from "./img/search-icon.svg";
import "./content.css";
import { AddressDefault } from "./data";
import { formatAddress } from "./formatAddress";

const defaultValue = AddressDefault.join("\n");

function Content() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [textareaValue, setTextareaValue] = useState(defaultValue);
  const [address, setAddress] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    setData([]);
    async function getData(addressCheck) {
      try {
        const response = await ZkCheckBalance(addressCheck);
        setData((prevData) => [
          ...prevData,
          {
            address: response.account,
            ETHBalance: response.ETHBalance,
            HOLDBalance: response.HOLDBalance,
            USDCBalance: response.USDCBalance,
          },
        ]);
      } catch (error) {
        console.error(
          `Error fetching data for address ${addressCheck}:`,
          error
        );
      }
    }

    address.forEach((value) => {
      getData(value);
    });
  }, [address]);

  function handleClick() {
    setButtonDisabled(true);
    const addressesArray = textareaValue.split("\n");
    const uniqueAddresses = Array.from(new Set([...addressesArray]));
    setAddress(uniqueAddresses);
    setShow(true);

    setTimeout(() => {
      setButtonDisabled(false);
    }, 3000);
  }

  let totalETH = 0;
  for (const value of data.map((value) => value.ETHBalance)) {
    totalETH += value;
  }

  let totalHOLD = 0;
  for (const value of data.map((value) => value.HOLDBalance)) {
    totalHOLD += value;
  }

  let totalUSDC = 0;
  for (const value of data.map((value) => value.USDCBalance)) {
    totalUSDC += value;
  }

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  console.log(data);

  return (
    <div>
      <div className="lg:flex">
        <div className="pt-10 pl-8 w-1/2">
          <h1 className="text-3xl font-bold">CHECKING ETH & HOLD BALANCE</h1>
          <p className="font-bold">ZKSync Era - Mainnet</p>
          <div>
            <textarea
              rows={18}
              cols={80}
              className="border-b-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] outline-none"
              onChange={handleTextareaChange}
              value={textareaValue}
            />
            <div className="md:w-fit block md:inline-block md:pl-2">
              <button
                className="flex items-center cursor-pointer"
                onClick={handleClick}
                disabled={buttonDisabled}
              >
                <p className="font-bold">CHECKING</p>
                <img src={search} alt="search" className="pl-2 h-4" />
              </button>
            </div>
          </div>
        </div>
        {show && (
          <div>
            <table>
              <tr>
                <th>Address</th>
                <th>ETH Balance</th>
                <th>USDC Balance</th>
                <th>HOLD Balance</th>
                <th>HOLD Staking</th>
              </tr>
              {data.map((value, idx) => (
                <tr className={idx}>
                  <td className="font-semibold">
                    <a
                      href={`https://debank.com/profile/${value.address}`}
                      target="blank"
                    >
                      {formatAddress(value.address)}
                    </a>
                  </td>
                  <td>
                    {Number(value.ETHBalance.toFixed(4)) === 0
                      ? 0
                      : value.ETHBalance.toFixed(4)}
                  </td>
                  <td>
                    {Number(value.USDCBalance.toFixed(4)) === 0
                      ? 0
                      : value.USDCBalance.toFixed(4)}
                  </td>
                  <td>
                    {Number(value.HOLDBalance.toFixed(4)) === 0
                      ? 0
                      : value.HOLDBalance.toFixed(4)}
                  </td>
                </tr>
              ))}
              <tr>
                <th>Total:</th>
                <th>{totalETH.toFixed(4)} ETH</th>
                <th>{totalUSDC.toFixed(4)} USDC</th>
                <th>{totalHOLD.toFixed(4)} HOLD</th>
              </tr>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
