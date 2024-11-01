import React, { useContext } from "react";
import { NavToggle } from "../Context/Context";
const Footer = () => {
  let { navVisibility } = useContext(NavToggle);
  return (
    <div
      className={
        navVisibility === false
          ? "w-[80%] bg-white border-t border-[#dbdfe6] h-[50px] p-[10px] text-center fixed bottom-0 box-border"
          : "w-full bg-white border-t border-[#dbdfe6] h-[50px] p-[10px] text-center fixed bottom-0 box-border"
      }
    >
      developed@admin.com
    </div>
  );
};

export default Footer;
