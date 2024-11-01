import React from "react";

const UpdatePCategory = () => {
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Update Product Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="categoryName"
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="categoryImg"
              id="categoryImg"
              className="input border w-full rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="categoryDesc"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Status
            </label>
            <input
              type="radio"
              name="categoryStatus"
              id="categoryStatus"
              value="0"
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="categoryStatus"
              id="categoryStatus"
              value="1"
              checked
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[20px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add Size
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePCategory;
