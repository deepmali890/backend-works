import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { RxHamburgerMenu } from "react-icons/rx";
import {
  // IoMailOpenOutline,
  IoMenuOutline,
  // IoDocumentOutline,
} from "react-icons/io5";
import { NavToggle } from "../Context/Context";
// import { GoBell } from "react-icons/go";
// import { GoChecklist } from "react-icons/go";
import { SlUser } from "react-icons/sl";
// import { RxGear } from "react-icons/rx";
// import { MdOutlinePayment } from "react-icons/md";
import { CiChat1, CiLock } from "react-icons/ci";
import Cookies from "js-cookie";
function Header() {
  const nav = useNavigate();
  let { navVisible, setNavVisibility } = useContext(NavToggle);
  let [width, setWidth] = useState(false);
  let [profileDropDown, setProfileDropDown] = useState(false);


  return (
    <div
      className={
        width === false
          ? "w-[80%] bg-white flex justify-between h-[60px] header py-[10px] px-[30px] fixed top-0 z-50"
          : "w-full bg-white flex justify-between h-[60px] header py-[10px] px-[30px] fixed top-0 z-50"
      }
    >
      <span className="my-[5px] text-[25px] w-[200px]  flex gap-[20px]">
        <IoMenuOutline
          className="cursor-pointer"
          onClick={() => {
            setNavVisibility(!navVisible);
            setWidth(!width);
          }}
        />
        <span className="text-[16px] font-extralight text-[#303640]">
          Dashboard
        </span>
      </span>
      <span
        className="object-contain relative cursor-pointer"
        onClick={() => setProfileDropDown(!profileDropDown)}
      >
        <img
          src="/profile.jpg"
          alt="profile"
          width={40}
          height={40}
          className="rounded-[50%]"
        />
        <div
          className={
            profileDropDown === false
              ? "hidden"
              : "w-[180px] absolute top-[45px] -z-50 rounded-[5px] bg-white border right-[0px] profileBox"
          }
        >
          <ul className="list-none w-full ">
            <Link to="/dashboard/profile">
              <li className="w-full grid grid-cols-[20px_auto] box-border gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
                <span className="p-[7px_1px]">
                  <SlUser />{" "}
                </span>
                <span>Profile</span>
              </li>
            </Link>
              <li className="w-full box-border grid grid-cols-[30px_auto] gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
                <span className="p-[7px_1px]">
                  <CiLock />{" "}
                </span>
                <span>
                  <button>Lock Account</button>
                </span>
              </li>
          </ul>
        </div>
      </span>
    </div>
  );
}

export default Header;
