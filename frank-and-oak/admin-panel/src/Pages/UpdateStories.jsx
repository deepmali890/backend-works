import React from "react";

const UpdateStories = () => {
  function handleClick(e) {
    e.preventDefault();
  }
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[#303640] border-b rounded-[10px_10px_0_0] p-[8px_16px] text-[20px] font-bold">
        Update Stories
      </span>
      <div className="w-[90%] mx-auto">
        <form>
          <div className="w-full my-[10px] ">
            <label htmlFor="story_name" className="block text-[#303640]">
              Story Name
            </label>
            <input
              type="text"
              id="story_name"
              name="story_name"
              placeholder="Story Name"
              className="w-full input p-2 border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px] ">
            <label
              htmlFor="story_img"
              className="block text-[#303640]"
              onClickCapture={(e) => handleClick(e)}
            >
              Image
            </label>
            <input
              type="file"
              id="story_img"
              name="story_img"
              className="w-full input category border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="story_banner_img"
              className="block text-[#303640]"
              onClickCapture={(e) => handleClick(e)}
            >
              Banner Image
            </label>
            <input
              type="file"
              id="story_banner_img"
              name="story_banner_img"
              className="w-full input category border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="story_desc"
              className="block text-[#303640]"
              onClickCapture={(e) => handleClick(e)}
            >
              Description
            </label>
            <textarea
              type="file"
              id="story_desc"
              name="story_desc"
              placeholder="Description"
              className="w-full input p-2 category border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="status" className="mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              value="0"
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              value="1"
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px] p-[10px_0px]">
            <button className="w-[100px] rounded-md bg-[#5351c9] text-white p-2">
              Add Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStories;
