import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateColor = () => {

  const [color,setColor]= useState({})
  const nav =useNavigate()

  const setImage = () => {
    let imageFileInput = document.querySelector("#image_src");
    let imagePreview = document.querySelector("#image_preview");
    let colorCode = document.querySelector("#color_code");
    let color_picker = document.querySelector("#color_picker");
    imageFileInput.addEventListener("change", function () {
      const file = this.files[0];
      console.log(file);
      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.src = this.result;
      });
      reader.readAsDataURL(file);

      const colorPicker = new window.EyeDropper();
      const colorSelector = document.querySelector("#colorPicker");
      colorSelector.addEventListener("click", () => {
        colorPicker
          .open()
          .then((res) => {
            colorCode.value = res.sRGBHex;
            color_picker.value = res.sRGBHex;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  const {_id}= useParams();

  useEffect(()=>{
    console.log(_id)
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/color/read-cat/${_id}`)
    .then((response)=>{
      console.log(response.data.data);
      setColor(response.data.data)
     
    })
    .catch((error)=>{
      console.log(error);
      })
  },[_id])

  const handleUpdateCategory= ()=>{
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/color/update-cat/${_id}`,
      {
        name:color.name,
        code:color.code
      }
    )
    .then((response)=>{
      console.log(response.data.data);
      setColor(response.data.data)
           
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
  nav('/dashboard/color/view-colors')
});
     
    })
    .catch((error)=>{
      console.log(error);
      })
  }

  return (
    <div className="w-[90%] bg-white mx-auto rounded-[10px] border my-[150px]">
      <div className="bg-[#f8f8f9] h-[50px] header w-full p-[12px] rounded-[10px_10px_0_0]">
        Update Colors
      </div>
      <div className="w-full p-[20px]">
        <label htmlFor="color">Color Name</label> <br />
        <input
          type="text"
          name="color"
          id="color"
          value={color.name}
          onChange={(e)=>{setColor({...color, name:e.target.value})}}
          className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
          placeholder="Color Name"
        />
        <label htmlFor="color_code">Color Code</label> <br />
        <input
          type="text"
          name="color_code"
          id="color_code"
          value={color.code}
          onChange={(e)=>{setColor({...color, code:e.target.value})}}
          
          className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
          placeholder="Color Code"
        />
        <label htmlFor="color">Color Picker</label> <br />
        <input
          type="color"
          name="color_picker"
          id="color_picker"
          className="focus:outline-none border my-[10px] rounded-[5px]"
        />
        <div className="w-[300px] my-[10px]">
          {/* <ColorPicker color={color} onChange={setColor} height={200} /> */}
          <span className="w-full h-[200px] object-contain my-[10px]">
            <img
              src=""
              alt="Select product"
              id="image_preview"
              width={300}
              height={200}
            />
          </span>
          <input
            type="file"
            name="image"
            id="image_src"
            className="category w-full border input rounded-[5px]"
            onClick={() => setImage()}
          />
          <span
            id="colorPicker"
            className="w-[100px] bg-[#5351c9] text-white cursor-pointer h-[30px] text-center rounded-[5px] box-border my-[30px] block border"
          >
            Pick Color
          </span>
        </div>
        <button type="button" onClick={handleUpdateCategory} className="bg-[#5351C9] text-white rounded-[5px]  w-[120px] h-[40px]">
              Update color
            </button>
      </div>
    </div>
  );
};

export default UpdateColor;
