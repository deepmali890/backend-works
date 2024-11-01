import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewSlider = () => {
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border ">
      <span className="block p-[8px_16px] bg-[#f8f8f9] text-[#303640] border-b text-[20px] font-bold rounded-[10px_10px_0_0]">
        View Slider
      </span>
      <div className="w-[90%] mx-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2 flex">
                <button className=" bg-[#5351c9]  text-white font-light rounded-md p-1 w-[80px] h-[35px] mr-[10px] my-[10px]">
                  Delete
                </button>
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="deleteAll"
                  className="input cursor-pointer accent-[#5351c9]"
                />
              </th>
              <th className="p-2">Sno</th>
              <th className="p-2">Slider Name</th>
              <th className="p-2">Heading</th>
              <th className="p-2">Sub Heading</th>
              <th className="p-2">Slider Image</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="deleteAll"
                  className="input cursor-pointer accent-[#5351c9]"
                />
              </td>
              <td className="p-2">1</td>
              <td className="p-2 tracking-tighter">Main Page</td>
              <td className="p-2 tracking-tighter">
                New Summer must have just dropped.
              </td>
              <td className="p-2 tracking-tighter">
                free shipping on orders over $79
              </td>
              <td className="p-2 object-contain">
                <img
                  src="/Story_Banner.webp"
                  alt="slider img"
                  width={200}
                  height={200}
                  className="rounded-[5px]"
                />
              </td>
              <td className="p-2">
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to="/dashboard/slider/update-slider">
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td className="p-2 tracking-tighter">Display</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSlider;
