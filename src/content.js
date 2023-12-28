import { useState, useEffect } from "react";
import CallApi from "./callAPI";
import { Table } from "./callAPI";
import Recent from "./localstorage";
import search_icon from "./img/search-icon.svg";
import HashLoader from "react-spinners/HashLoader";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Content() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [table, setTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [autoClick, setAutoClick] = useState(false);
  const [noti, setNoti] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    setButtonDisabled(true);
    setTable(false);
    setLoading(true);
    const calldata = await CallApi(input);

    if (calldata.length === 0) {
      setNoti(true);
      if (input !== "") {
        let input_val = input.split(",").map((item) => item.trim());
        input_val.map((value) =>
          toast.error(`Cannot find address: ${value}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
      } else {
        toast.info("Insert Your Address!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      }

      setTable(false);
      setLoading(false);
    } else {
      setData(calldata);
      setLoading(false);
      setTable(true);
    }
    setButtonDisabled(false);
  };

  useEffect(() => {
    let input_val = input.split(",").map((item) => item.trim());
    let data_val = data.map((value) => value[0].address);
    let result = input_val.filter((value) => !data_val.includes(value));
    if (result[0] === "") {
      setNoti(false);
    } else {
      setNoti(true);
      result.map((value) => {
        toast.error(`Cannot find address: ${value}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("2");
      });
    }
  }, [data]);

  useEffect(() => {
    if (autoClick) {
      handleClick();
      setNoti(false);
      setAutoClick(false);
    }
  }, [autoClick]);

  return (
    <div>
      <div className="flex">
        <div className="pt-10 pl-8 w-3/5 border-r-2">
          <div className="w-1/2">
            <h1 className="text-3xl font-bold">
              CHECKING PENDING REWARD HARVESTED REWARD
            </h1>
            <p className="font-semibold">
              Insert your address and take information
            </p>
          </div>

          <div className="w-full pt-10" autoComplete="off">
            <input
              className="w-11/12 h-8 border-b-2 outline-none"
              type="text"
              onChange={handleInput}
            />
            <button
              disabled={isButtonDisabled}
              className="pl-4"
              onClick={handleClick}
            >
              <img src={search_icon} alt="search-bar" />
            </button>
          </div>

          {loading && (
            <div className="w-full flex justify-center pt-28">
              <HashLoader color={"#94A3B8"} loading={true} size={50} />
            </div>
          )}

          {table && <Table value={data} />}
        </div>
        <Recent data={setInput} click={setAutoClick} />
      </div>
      {noti && <ToastContainer />}
    </div>
  );
}

export default Content;
