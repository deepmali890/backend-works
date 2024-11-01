import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Accordion = () => {
  let [accordion, setAccordion] = useState(false);
  return (
    <div className="w-full grid grid-cols-[20%_auto] min-h-[100vh]">
      <div className="w-full bg-blue-950 text-white box-border">
        <ul className="w-full list-none p-2">
          <li className="w-full bg-[#ffffff2a] hover:bg-[#ffffff4a] cursor-pointer rounded-md my-[5px] p-2">
            Home
          </li>
          <li className="w-full bg-[#ffffff2a] hover:bg-[#ffffff4a] cursor-pointer rounded-md my-[5px] p-2">
            About us
          </li>
          <li
            onClick={() => setAccordion(!accordion)}
            className="w-full bg-[#ffffff2a] hover:bg-[#ffffff4a] cursor-pointer rounded-md my-[5px] p-2 grid grid-cols-[auto_10%] box-border"
          >
            Services
            {accordion === false ? (
              <IoIosArrowDown className="my-[5px] box-border" />
            ) : (
              <IoIosArrowUp className="my-[5px] box-border" />
            )}
            {accordion === false ? (
              ""
            ) : (
              <ul className="w-full mx-[10px]">
                <li className="pl-[10px] w-full bg-[#ffffff2a] hover:bg-[#ffffff4a] cursor-pointer rounded-md my-[5px] p-2">
                  {" "}
                  &gt; Frontend development
                </li>
                <li className="pl-[10px] w-full bg-[#ffffff2a] hover:bg-[#ffffff4a] cursor-pointer rounded-md my-[5px] p-2">
                  {" "}
                  &gt; Backend development
                </li>
              </ul>
            )}
          </li>
          <li className="w-full bg-[#ffffff2a] hover:bg-[#ffffff4a] cursor-pointer rounded-md my-[5px] p-2">
            Gallery
          </li>
          <li className="w-full bg-[#ffffff2a] hover:bg-[#ffffff4a] cursor-pointer rounded-md my-[5px] p-2">
            Contact
          </li>
        </ul>
      </div>
      <div>
        <div className="h-[50px] bg-white border-b-2 flex justify-end  p-[10px] box-border">
          <span className="cursor-pointer"> Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
