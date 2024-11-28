import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDeleteForever, MdOutlineSettingsBackupRestore } from "react-icons/md";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewSlider = () => {

  const [slider, setSlider] = useState([])
  const [filepath, setfilepath] = useState("")
  const [checked, setChecked] = useState([])
  const [ifAllChecked, setIfAllChecked] = useState(false)
  const [deletedSlider, setDeletedSlider] = useState([])
  const [open, setOpen] = useState(false);


  const fatchSlider = () => {

    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/slider/read-slider`)
      .then((res) => {
        // console.log(res.data)
        setSlider(res.data.data)
        setfilepath(res.data.filepath)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fatchDeletedSlider = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/slider/deleted-slider`)
      .then((res) => {
        console.log(res.data)
        setDeletedSlider(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => { fatchSlider(); fatchDeletedSlider() }, [])

  const updateSliderStatus = (e) => {
    const status = e.target.textContent !== "Active";
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/slider/update-slider-status/${e.target.value}`, { status })
      .then((res) => {
        // fatchSlider()

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 800
        });

        const index = slider.findIndex((sliders) => sliders._id === e.target.value)
        const newdata = [...slider]
        newdata[index].status = status
        setSlider(newdata)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  const handleDeleteSlider = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/slider/delete-slider/${id}`)
        .then((res) => {
          console.log(res.data)
          setSlider((pre) => (
            pre.filter((slider) => slider._id !== id)
          ))
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          fatchDeletedSlider()
  
        })
        .catch((err) => {
          console.log(err)
        })
      
      }
    });

 

  }

  const handleCheck = (e) => {
    // console.log(e.target.checked)
    if (e.target.checked) {
      setChecked([...checked, e.target.value])
    }
    else {
      setChecked((pre) => (
        pre.filter((item) => item !== e.target.value)
      ))
    }

  }

  const handleAllCheck = (e) => {
    // console.log(e.target.checked)
    setIfAllChecked(e.target.checked)
    if (e.target.checked) {
      setChecked(slider.map((item) => item._id))
    }
    else {
      setChecked([])
    }
  }

  useEffect(() => {
    setIfAllChecked(slider.length === checked.length && slider.length !== 0)
  }, [slider, checked])

  const handlemultiDelete = () => {
    if(checked.length===0) return

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/slider/multi-delete`, { ids: checked })
        .then((res) => {
          setSlider((pre) => (
            pre.filter((item) => !checked.includes(item._id))
          ))
          setIfAllChecked(false)
          setChecked([])

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        })
        .catch((err) => {
          console.log(err)
        })
     
      }
    });

  }

  const handleRestoreSlider=(id)=>{
   
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/slider/restore-slider/${id}`)
    .then((res) => {
     fatchSlider()
     fatchDeletedSlider()
     setOpen(false)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border ">
      <div className="flex justify-between items-center p-[8px_16px] bg-[#f8f8f9] text-[#303640] border-b text-[20px] font-bold rounded-[10px_10px_0_0]">
        <h4>View Slider</h4>
        <span className=" cursor-pointer" onClick={() => setOpen(true)}><MdDeleteForever /></span>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} center>
      <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2 flex">
                <button className=" bg-[#5351c9]  text-white font-light rounded-md p-1 w-[80px] h-[35px] mr-[10px] my-[10px]"
                  onClick={handlemultiDelete}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="deleteAll"
                  onClick={handleAllCheck}
                  checked={ifAllChecked}
                  className="input cursor-pointer accent-[#5351c9]"
                />
              </th>
              <th className="p-2">Sno</th>
              <th className="p-2">Slider Name</th>
              <th className="p-2">Heading</th>
              <th className="p-2">Sub Heading</th>
              <th className="p-2">Slider Image</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              deletedSlider.map((items, index) => (
                <tr className="border-b">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      id="delete"
                      name="delete"
                      value={items._id}
                      onClick={handleCheck}
                      checked={checked.includes(items._id)}
                      className="input cursor-pointer accent-[#5351c9]"
                    />
                  </td>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 tracking-tighter">{items.name}</td>
                  <td className="p-2 tracking-tighter">
                    {items.heading}
                  </td>
                  <td className="p-2 tracking-tighter">
                    {items.sub_heading}
                  </td>
                  <td className="p-2 object-contain">
                    <img
                      src={filepath + items.thumbnail}
                      alt="slider img"
                      width={200}
                      height={200}
                      className="rounded-[5px]"
                    />
                  </td>
                  <td className="p-2">
                    <MdDelete onClick={() => { handleDeleteSlider(items._id) }} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                   
                      <MdOutlineSettingsBackupRestore onClick={()=>{handleRestoreSlider(items._id)}} className="my-[5px] text-yellow-500 cursor-pointer inline" />
                   
                  </td>
                
                </tr>
              ))
            }

          </tbody>
        </table>
      </Modal>
      <div className="w-[90%] mx-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2 flex">
                <button className=" bg-[#5351c9]  text-white font-light rounded-md p-1 w-[80px] h-[35px] mr-[10px] my-[10px]"
                  onClick={handlemultiDelete}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="deleteAll"
                  onClick={handleAllCheck}
                  checked={ifAllChecked}
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
            {
              slider.map((item, index) => (
                <tr className="border-b">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      id="delete"
                      name="delete"
                      value={item._id}
                      onClick={handleCheck}
                      checked={checked.includes(item._id)}
                      className="input cursor-pointer accent-[#5351c9]"
                    />
                  </td>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 tracking-tighter">{item.name}</td>
                  <td className="p-2 tracking-tighter">
                    {item.heading}
                  </td>
                  <td className="p-2 tracking-tighter">
                    {item.sub_heading}
                  </td>
                  <td className="p-2 object-contain">
                    <img
                      src={filepath + item.thumbnail}
                      alt="slider img"
                      width={200}
                      height={200}
                      className="rounded-[5px]"
                    />
                  </td>
                  <td className="p-2">
                    <MdDelete onClick={() => { handleDeleteSlider(item._id) }} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to={`/dashboard/slider/update-slider/${item._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td className="p-2 tracking-tighter">
                    <button
                      data-tooltip-id="my-tooltip"
                      value={item._id}
                      onClick={updateSliderStatus}
                      data-tooltip-content={(item.status) ? "Click to Inactive" : "Click to Active"}
                      className={`p-[4px_10px] rounded-sm ${(item.status) ? "bg-green-500" : "bg-red-500"}  text-white`}>
                      {(item.status) ? "Active" : "Inactive"}
                    </button>
                    <Tooltip id="my-tooltip" />
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSlider;
