import React from "react";

const AddSlider = () => {
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] p-[8px_16px] text-[#303640] text-[20px] font-bold border-b rounded-[10px_10px_0_0]">
        Add Slider
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form>
          <div className="w-full my-[10px]">
            <label htmlFor="slider_name" className="block text-[#303640]">
              Slider Name
            </label>
            <input
              type="text"
              id="slider_name"
              name="slider_name"
              placeholder="Slider Name"
              className="w-full rounded-[10px] p-2 my-[10px] border input"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="slider_heading" className="block text-[#303640]">
              Heading
            </label>
            <input
              type="text"
              id="slider_heading"
              name="slider_heading"
              placeholder="Heading"
              className="w-full rounded-[10px] p-2 my-[10px] border input"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="slider_sub_heading"
              className="block text-[#303640]"
            >
              Sub Heading
            </label>
            <input
              type="text"
              id="slider_sub_heading"
              name="slider_sub_heading"
              placeholder="Sub Heading"
              className="w-full rounded-[10px] p-2 my-[10px] border input"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="slider_img"
              className="block text-[#303640]"
              onClick={(e) => e.preventDefault()}
            >
              Sub Heading
            </label>
            <input
              type="file"
              id="slider_img"
              name="slider_img"
              className="w-full rounded-[10px] my-[10px] border input category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="slider_status">Status</label>
            <input
              type="radio"
              className="input mx-[10px] accent-[#5351c9] cursor-pointer"
              id="slider_status"
              name="slider_status"
            />
            <span>Display</span>
            <input
              type="radio"
              className="input mx-[10px] accent-[#5351c9] cursor-pointer"
              id="slider_status"
              name="slider_status"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px]">
            <button className="w-[100px] rounded-[10px] bg-[#5351c9] text-white p-2">
              Add Slider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSlider;
