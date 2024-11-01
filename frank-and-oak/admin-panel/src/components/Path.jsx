import React, { useContext } from "react";
import { useResolvedPath } from "react-router-dom";
import { NavToggle } from "../Context/Context";
function Path() {
  let { navVisible } = useContext(NavToggle);
  let currentPage = useResolvedPath();
  let page = currentPage.pathname;
  // console.log(typeof page);
  // let showPath = page.split("/").join("/ ");
  return (
    <div
      className={
        navVisible === false
          ? "w-[80%] h-[40px] bg-white path p-[10px_30px] mt-[60px] fixed z-40 shadow-lg"
          : "w-full h-[40px] bg-white path p-[10px_30px] mt-[60px] fixed z-40 shadow-lg"
      }
    >
      <span>{page}</span>
    </div>
  );
}

export default Path;
