import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateSlider = () => {

  const { _id } = useParams()
  const [slider, setSlider] = useState({})
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/slider/read-slider/${_id}`)
      .then((res) => {
        console.log(res.data)
        setSlider(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [_id])

  const handleUpdateSlider = () => {
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/slider/update-slider/${_id}`,
      {
        name: slider.name,
        heading: slider.heading,
        sub_heading:slider.sub_heading
      })
      .then((res) => {
        console.log(res.data)
        // alert("Slider updated successfully")
        setSlider(res.data.data)

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
          nav('/dashboard/slider/view-slider')
        });
      })
      .catch((err) => {
        console.log(err)
      })

  }
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] p-[8px_16px] text-[#303640] text-[20px] font-bold border-b rounded-[10px_10px_0_0]">
        Update Slider
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
              name="name"
              placeholder="Slider Name"
              value={slider.name}
              onChange={(e) => { setSlider({ ...slider, name: e.target.value }) }}
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
              name="heading"
              placeholder="Heading"
              value={slider.heading}
              onChange={(e) => { setSlider({ ...slider, heading: e.target.value }) }}
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
              value={slider.sub_heading}
              onChange={(e) => { setSlider({ ...slider, sub_heading: e.target.value }) }}
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
            <button type="button" onClick={handleUpdateSlider} className="px-3 rounded-[10px] bg-[#5351c9] text-white p-2">
              Update Slider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSlider;
