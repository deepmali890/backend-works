import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateStories = () => {
  // function handleClick(e) {
  //   e.preventDefault()
  // }

  const { _id } = useParams();
  const nav = useNavigate()
  const [story, setStory] = useState({})


  console.log(_id)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/story/read-story/${_id}`)
      .then((res) => {
        // console.log(res.data)
        setStory(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [_id])

  const handleUpdateStory= ()=>{
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/story/update-story/${_id}`,{
      name:story.name,
      description:story.description,
    })
    .then((res)=>{
      console.log(res.data)
      let timerInterval;
      Swal.fire({
        title: "Category added",
        html: "You're are redirecting to view page <b></b> milliseconds.",
        timer: 700,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        nav('/dashboard/stories/view-story')
      });
      })
      .catch((err)=>{
        console.log(err)
        })
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
              id="name"
              name="name"
              placeholder="Story Name"
              value={story.name}
              onChange={(e) => { setStory({ ...story, name: e.target.value }) }}
              className="w-full input p-2 border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px] ">
            <label
              htmlFor="story_img"
              className="block text-[#303640]"
            // onClickCapture={(e) => handleClick(e)}
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
            // onClickCapture={(e) => handleClick(e)}
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
            // onClickCapture={(e) => handleClick(e)}
            >
              Description
            </label>
            <textarea
              type="file"
              id="story_desc"
              name="description"
              placeholder="Description"
              value={story.description}
              onChange={(e) => { setStory({ ...story, description: e.target.value }) }}
              className="w-full input p-2 category border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="status" className="mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              value={true}
              checked
               name="status"
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
               name="status"
              value={false}
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
              
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px] p-[10px_0px]">
            <button type="button" onClick={handleUpdateStory} className=" h-10 rounded-md bg-[#5351c9] text-white px-3">
             Update Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStories;
