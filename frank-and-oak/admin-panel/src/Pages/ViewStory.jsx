import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewStory = () => {
  let [showDesc1, setShowDesc1] = useState(false);
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block p-[8px_16px] text-[20px] text-[#303640] font-bold bg-[#f8f8f9] border-b rounded-[10px_10px_0_0]">
        View Stories
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                Delete{" "}
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAll"
                  className="accent-[#5351c9] cursor-pointer input"
                />
              </th>
              <th>Sno</th>
              <th>Story Name</th>
              <th>Image</th>
              <th>Banner</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td>
                <input
                  type="checkbox"
                  name="delete"
                  id="delete"
                  className="accent-[#5351c9] cursor-pointer input"
                />
              </td>
              <td>1</td>
              <td>Who We are</td>
              <td className="object-contain p-1">
                <img
                  src="/Story_Img.avif"
                  alt="story img"
                  width={80}
                  height={80}
                  className="rounded-[5px]"
                />
              </td>
              <td className="p-1 object-contain">
                <img
                  src="/Story_Banner.webp"
                  alt="story img"
                  width={150}
                  height={150}
                  className="rounded-[5px]"
                />
              </td>
              <td className="w-[200px] p-2 text-justify tracking-tighter">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Placeat, est?{" "}
                <span
                  onClick={() => setShowDesc1(!showDesc1)}
                  className={
                    showDesc1 === false ? "font-bold cursor-pointer" : "hidden"
                  }
                >
                  ...Read
                </span>
                {showDesc1 === false ? (
                  ""
                ) : (
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Modi error, magni commodi doloribus quisquam itaque dolorem,
                    quae quas ex eligendi accusamus nulla. Voluptatum animi
                    cumque fuga ad accusamus similique nulla!
                  </span>
                )}
              </td>
              <td>
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to="/dashboard/stories/update-stories">
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td>Display</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStory;
