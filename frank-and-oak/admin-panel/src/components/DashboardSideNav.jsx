import React, { useContext, useState } from "react";
import { BsSpeedometer2 } from "react-icons/bs";
import { CiDroplet } from "react-icons/ci";
import { GoGear } from "react-icons/go";
import { MdOutlineTouchApp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { ImParagraphLeft } from "react-icons/im";
import { LiaBabyCarriageSolid } from "react-icons/lia";
import { BsBasket } from "react-icons/bs";
import { RxCountdownTimer } from "react-icons/rx";
import { MdBorderColor } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { NavToggle } from "../Context/Context";

function DashboardSideNav() {
  let [size, setSize] = useState(false);
  let [color, setColor] = useState(false);
  let [category, setCategory] = useState(false);
  let [productCategory, setProductCategory] = useState(false);
  let [product, setProduct] = useState(false);
  let [story, setStory] = useState(false);
  let [slider, setSlider] = useState(false);

  let { navVisible } = useContext(NavToggle);
  return (
    <div
      className={
        navVisible === false
          ? "w-full bg-[#212631] min-h-[100vh] "
          : "hidden w-0"
      }
    >
      <Link to={"/dashboard"}>
        <div className="p-[16px] text-center text-white text-[24px] border-bottom cursor-pointer">
          Frank and Oak
        </div>
      </Link>

      <ul className="list-none w-auto m-[8px] text-[16px] text-white sideNav">
        <Link to={"/dashboard"}>
          <li className="w-full grid grid-cols-[20%_auto] px-[12px] text-white py-[10px] rounded-[5px] bg-[#2a303d] cursor-pointer mb-[5px] box-border">
            <span className="icon">
              <BsSpeedometer2 className=" text-[#ffffff6a] w-full my-[5px]" />
            </span>
            <span className="w-full px-2">Dashboard</span>
          </li>
        </Link>

        {/* <Link to={"/dashboard/colors"}>
          <li className="w-full grid grid-cols-[20%_auto] px-[12px] py-[10px] hover:text-white rounded-[5px] hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border">
            <span className="icon">
              <CiDroplet className="w-full my-[5px]" />
            </span>
            <span className="w-full px-2 ">Colors</span>
          </li>
        </Link> */}
        <Link to={"/dashboard/profile"}>
          <li className="w-full grid grid-cols-[20%_auto] px-[12px] py-[10px] rounded-[5px] hover:text-white hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border">
            <span className="icon">
              <GoGear className="w-full my-[5px] text-[#ffffff6a]" />
            </span>
            <span className="w-full px-2">Profile</span>
          </li>
        </Link>

        <div className="font-bold text-[#ffffff6a] text-center uppercase h-[40px] my-[5px] text-[13px] px-[12px] py-[10px]">
          Ecommerce Components
        </div>
        <li
          className="w-full grid grid-cols-[20%_auto_10%] px-[12px] py-[10px] rounded-[5px] hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border"
          onClick={() => setSize(!size)}
        >
          <span className="icon">
            <MdOutlineTouchApp className="text-[#ffffff6a] w-full my-[5px]" />
          </span>
          <span className="w-full px-2">Size</span>
          {size === false ? (
            <IoIosArrowDown className="m-1 text-[#ffffff6a]" />
          ) : (
            <IoIosArrowUp className="m-1 text-[#ffffff6a]" />
          )}
          {size === false ? (
            ""
          ) : (
            <ul className="w-[230px] ">
              <Link to="/dashboard/size/add-sizes">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px]  p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full mt-[5px] p-1 text-[14px]" />
                  <span>Size Details</span>
                </li>
              </Link>
              <Link to="/dashboard/size/view-sizes">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px] p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full  mt-[5px] p-1 text-[14px]" />
                  <span>View Sizes</span>
                </li>
              </Link>
            </ul>
          )}
        </li>
        <li
          className="w-full grid grid-cols-[20%_auto_10%] px-[12px] py-[10px] rounded-[5px] hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border"
          onClick={() => setColor(!color)}
        >
          <span className="icon">
            <CiDroplet className="text-[#ffffff6a] w-full my-[5px]" />
          </span>
          <span className="w-full px-2">Color</span>
          {color === false ? (
            <IoIosArrowDown className="m-1 text-[#ffffff6a]" />
          ) : (
            <IoIosArrowUp className="m-1 text-[#ffffff6a]" />
          )}
          {color === false ? (
            ""
          ) : (
            <ul className="w-[230px] ">
              <Link to="/dashboard/color/add-colors">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px]  p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full mt-[5px] p-1 text-[14px]" />
                  <span>Add Color</span>
                </li>
              </Link>
              <Link to="/dashboard/color/view-colors">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px] p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full  mt-[5px] p-1 text-[14px]" />
                  <span>View Color</span>
                </li>
              </Link>
            </ul>
          )}
        </li>

        <li
          className="w-full grid grid-cols-[20%_auto_10%] px-[12px] py-[10px] rounded-[5px] hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border"
          onClick={() => setCategory(!category)}
        >
          <span className="icon">
            <ImParagraphLeft className="text-[#ffffff6a] w-full my-[5px]" />
          </span>
          <span className="w-full px-2">Parent Category</span>
          {category === false ? (
            <IoIosArrowDown className="m-1 text-[#ffffff6a]" />
          ) : (
            <IoIosArrowUp className="m-1 text-[#ffffff6a]" />
          )}
          {category === false ? (
            ""
          ) : (
            <ul className="w-[230px]">
              <Link to="/dashboard/category/add-category">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px]  p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full mt-[5px] p-1 text-[14px]" />
                  <span>Add Category</span>
                </li>
              </Link>
              <Link to="/dashboard/category/view-category">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px] p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full  mt-[5px] p-1 text-[14px]" />
                  <span>View Category</span>
                </li>
              </Link>
            </ul>
          )}
        </li>
        <li
          className="w-full grid grid-cols-[20%_auto_10%] px-[12px] py-[10px] rounded-[5px] hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border"
          onClick={() => setProductCategory(!productCategory)}
        >
          <span className="icon">
            <LiaBabyCarriageSolid className="text-[#ffffff6a] w-full my-[5px]" />
          </span>
          <span className="w-full px-2">Product Category</span>
          {productCategory === false ? (
            <IoIosArrowDown className="m-1 text-[#ffffff6a]" />
          ) : (
            <IoIosArrowUp className="m-1 text-[#ffffff6a]" />
          )}
          {productCategory === false ? (
            ""
          ) : (
            <ul className="w-[230px] ">
              <Link to="/dashboard/products/add-category">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px]  p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full mt-[5px] p-1 text-[14px]" />
                  <span>Add Product Category</span>
                </li>
              </Link>
              <Link to="/dashboard/products/view-category">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px] p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full  mt-[5px] p-1 text-[14px]" />
                  <span>View Product Category</span>
                </li>
              </Link>
            </ul>
          )}
        </li>
        <li
          className="w-full grid grid-cols-[20%_auto_10%] px-[12px] py-[10px] rounded-[5px] hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border"
          onClick={() => setProduct(!product)}
        >
          <span className="icon">
            <BsBasket className="text-[#ffffff6a] w-full my-[5px]" />
          </span>
          <span className="w-full px-2">Product</span>
          {product === false ? (
            <IoIosArrowDown className="m-1 text-[#ffffff6a]" />
          ) : (
            <IoIosArrowUp className="m-1 text-[#ffffff6a]" />
          )}
          {product === false ? (
            ""
          ) : (
            <ul className="w-[230px] ">
              <Link to="/dashboard/products/add-product">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px]  p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full mt-[5px] p-1 text-[14px]" />
                  <span>Add Product</span>
                </li>
              </Link>
              <Link to="/dashboard/products/view-product">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px] p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full  mt-[5px] p-1 text-[14px]" />
                  <span>View Product</span>
                </li>
              </Link>
            </ul>
          )}
        </li>
        <li
          className="w-full grid grid-cols-[20%_auto_10%] px-[12px] py-[10px] rounded-[5px] hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border"
          onClick={() => setStory(!story)}
        >
          <span className="icon">
            <RxCountdownTimer className="text-[#ffffff6a] w-full my-[5px]" />
          </span>
          <span className="w-full px-2">Story</span>
          {story === false ? (
            <IoIosArrowDown className="m-1 text-[#ffffff6a]" />
          ) : (
            <IoIosArrowUp className="m-1 text-[#ffffff6a]" />
          )}
          {story === false ? (
            ""
          ) : (
            <ul className="w-[230px] ">
              <Link to="/dashboard/stories/add-story">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px]  p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full mt-[5px] p-1 text-[14px]" />
                  <span>Story Details</span>
                </li>
              </Link>
              <Link to="/dashboard/stories/view-story">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px] p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full  mt-[5px] p-1 text-[14px]" />
                  <span>Story View</span>
                </li>
              </Link>
            </ul>
          )}
        </li>
        <Link to="/dashboard/orders">
          <li className="w-full grid grid-cols-[20%_auto] px-[12px] py-[10px] hover:text-white rounded-[5px] hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border">
            <span className="icon">
              <MdBorderColor className="w-full my-[5px] text-[#ffffff6a]" />
            </span>
            <span className="w-full px-2">Order</span>
          </li>
        </Link>
        <li
          className="w-full grid grid-cols-[20%_auto_10%] px-[12px] py-[10px] rounded-[5px] hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border"
          onClick={() => setSlider(!slider)}
        >
          <span className="icon">
            <RxCountdownTimer className="text-[#ffffff6a] w-full my-[5px]" />
          </span>
          <span className="w-full px-2">Slider</span>
          {slider === false ? (
            <IoIosArrowDown className="m-1 text-[#ffffff6a]" />
          ) : (
            <IoIosArrowUp className="m-1 text-[#ffffff6a]" />
          )}
          {slider === false ? (
            ""
          ) : (
            <ul className="w-[230px] ">
              <Link to="/dashboard/slider/add-slider">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px]  p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full mt-[5px] p-1 text-[14px]" />
                  <span>Slider Details</span>
                </li>
              </Link>
              <Link to="/dashboard/slider/view-slider">
                <li className="w-full grid grid-cols-[20%_auto]  hover:bg-[#2a303d] rounded-[5px] my-[5px] p-[10px]">
                  <FaRegCircle className="text-[#ffffff6a] w-full  mt-[5px] p-1 text-[14px]" />
                  <span>Slider View</span>
                </li>
              </Link>
            </ul>
          )}
        </li>
        <li className="w-full grid grid-cols-[20%_auto] px-[12px] py-[10px] hover:text-white rounded-[5px] hover:bg-[#2a303d] cursor-pointer mb-[5px] box-border">
          <span className="icon">
            <IoDocumentTextOutline className="w-full my-[5px] text-[#ffffff6a]" />
          </span>
          <span className="w-full px-2">Terms & Conditions</span>
        </li>
      </ul>
      <div className="flex justify-end border-up box-border footer">
        <Link to='/'>
          <span className="block p-[12px_0]">
            {" "}
            <CiLogout className="text-[25px] text-[#ffffff6a] hover:text-[#ffffff9a] mx-[20px] cursor-pointer" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default DashboardSideNav;
