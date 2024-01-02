import insert from "./img/insert-icon.svg";
import reload from "./img/reload-icon.svg";
import trash from "./img/trash-can.svg";
import { useState } from "react";
import CallApi from "./callAPI";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function addAddressToLocalStorage(address) {
  let storedAddress = JSON.parse(localStorage.getItem("address")) || [];

  if (!storedAddress.includes(address)) {
    storedAddress.push(address);
    localStorage.setItem("address", JSON.stringify(storedAddress));
    toast.success(`Add ${address} successfully`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.warn(`${address} have already`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

function removeAddressFromLocalStorage(address) {
  let storedAddresses = JSON.parse(localStorage.getItem("address")) || [];

  const addressIndex = storedAddresses.indexOf(address);
  const remv_val = address;
  if (addressIndex !== -1) {
    storedAddresses.splice(addressIndex, 1);

    localStorage.setItem("address", JSON.stringify(storedAddresses));

    toast.success(`Remove ${remv_val} successfully`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

function Recent({ data, click }) {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [input, setInput] = useState("");
  const [renderCount, setRenderCount] = useState(0);
  const recent = JSON.parse(localStorage.getItem("address")) || [];

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    CallApi(input);

    setRenderCount(renderCount + 1);
  };

  const handleClickReload = () => {
    setButtonDisabled(true);
    let storedAddress = JSON.parse(localStorage.getItem("address")) || [];
    data(storedAddress.toString());
    click(true);
    setInterval(() => {
      setButtonDisabled(false);
    }, 3000);
  };

  const handleClickDelete = (e) => {
    const target = e.target.className;
    removeAddressFromLocalStorage(target);
    setRenderCount(renderCount + 1);
  };

  return (
    <div className="w-2/5">
      <div className="flex justify-around pt-10">
        <div>
          <input
            onChange={handleInput}
            className="border-b-2 w-96 outline-none"
            type="text"
          />
          <button className="pl-2" onClick={handleClick}>
            <img src={insert} alt="insert" />
          </button>
        </div>
        <div>
          <button disabled={isButtonDisabled} onClick={handleClickReload}>
            <img src={reload} alt="reload" />
          </button>
        </div>
      </div>
      <div className="pt-5 flex justify-center">
        <table className="table-auto">
          <tbody>
            {recent.map((value, index) => {
              return (
                <tr className={index}>
                  <td className="py-3 font-semibold">
                    {index + 1}.{" "}
                    <a
                      href={`https://debank.com/profile/${value}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {value}
                    </a>
                  </td>
                  <td className="pl-48">
                    <button onClick={handleClickDelete}>
                      <img className={value} src={trash} alt="trash" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Recent;
export { addAddressToLocalStorage };
