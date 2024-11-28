import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDeleteForever, MdOutlineSettingsBackupRestore } from "react-icons/md";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewStory = () => {
  let [showDesc1, setShowDesc1] = useState(false);

  const [story, setStory] = useState([])
  const [deletedStory,setDeletedStory] =useState([])
  const [filepath, setfilepath] = useState("")
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([])
  const [ifAllChecked, setIfAllChecked] = useState(false)
  

  const fatchStory = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/story/read-story`)
      .then((res) => {
        console.log(res.data);
        setStory(res.data.data)
        setfilepath(res.data.filepath)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const fatchDeletedStory =()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/story/deleted-story`)
    .then((res) => {
      console.log(res.data);
      setDeletedStory(res.data.data)
      // setfilepath(res.data.filepath)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleUpdateStoryStatus =(e)=>{
    const status = e.target.textContent !== "Active";
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/story/upadteStory-status/${e.target.value}`, {status})
    .then((res) => {
      console.log(res.data);
      // fatchStory();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 800
      });

      const index = story.findIndex((stories)=> stories._id === e.target.value)
      const newData = [...story]
      newData[index].status = status
      setStory(newData)
      })
      .catch((err) => {
        console.log(err);
        })
  }

  const handleDeleteStory = (id) => {

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
        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/story/delete-story/${id}`)
        .then((res) => {
          console.log(res.data);
          // fatchStory();
          setStory((pre) => (
            pre.filter((stories) => stories._id !== id)
          ))
          Swal.fire({
            title: "Deleted!",
            text: "Your story has been deleted.",
            icon: "success"
          });
          fatchDeletedStory()
        })
        .catch((err) => {
          console.log(err);
        })
       
      }
    });
  
  }

  const handlerestoreStory=(id)=>{
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/story/restore-story/${id}`)
    .then((res) => {
      console.log(res.data);
      fatchStory();
      fatchDeletedStory()
      setOpen(false)
      })
      .catch((err) => {
        console.log(err);
        })

  }

  const handleCheck =(e)=>{
    if (e.target.checked) {
      setChecked([...checked, e.target.value])
    } else {
      setChecked((pre) => pre.filter((item) => item !== e.target.value))
    }
  }

  const handleAllCheck =(e)=>{

    setIfAllChecked(e.target.checked)
    if(e.target.checked){
      setChecked(story.map((item)=>item._id))
    }
    else{
      setChecked([])
    }
  }

  useEffect(()=>{
    setIfAllChecked(story.length===checked.length && story.length !== 0)
  },[story,checked])

  const handleMultidelete=()=>{
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
        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/story/multiDelete-story`,{ ids: checked })
        .then((res) => {
          console.log(res.data);
          setStory((pre)=>(
            pre.filter((item)=>!checked.includes(item._id))
          ))
          setIfAllChecked(false)
          setChecked([])
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          fatchDeletedStory()
        
          })
          .catch((err) => {
            console.log(err);
            })
       
      }
    });
  
  }

  useEffect(() => { fatchStory(); fatchDeletedStory() }, [])
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <div className="flex justify-between items-center p-[8px_16px] text-[20px] text-[#303640] font-bold bg-[#f8f8f9] border-b rounded-[10px_10px_0_0]">
        <h4> View Stories </h4>
        <span className=" cursor-pointer" onClick={() => setOpen(true)}><MdDeleteForever /></span>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} center>
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
           
            </tr>
          </thead>
          <tbody>
            {
              deletedStory.map((items, index) => (
                <tr className="border-b">
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete"
                      className="accent-[#5351c9] cursor-pointer input"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{items.name}</td>
                  <td className="object-contain p-1">
                    <img
                      src={filepath + items.thumbnail}
                      alt="story img"
                      width={80}
                      height={80}
                      className="rounded-[5px]"
                    />
                  </td>
                  <td className="p-1 object-contain">
                    <img
                      src={filepath + items.banner}
                      alt="story img"
                      width={150}
                      height={150}
                      className="rounded-[5px]"
                    />
                  </td>
                  <td className="w-[200px] p-2 text-justify tracking-tighter">
                    {items.descrption} {" "}
                    <span
                      onClick={() => setShowDesc1(!showDesc1)}
                      className={
                        showDesc1 === false ? "font-bold cursor-pointer" : "hidden"
                      }
                    >
                      ...Read
                    </span>
                    {/* {showDesc1 === false ? (
                    ""
                  ) : (
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Modi error, magni commodi doloribus quisquam itaque dolorem,
                      quae quas ex eligendi accusamus nulla. Voluptatum animi
                      cumque fuga ad accusamus similique nulla!
                    </span>
                  )} */}
                  </td>
                  <td>
                    <MdDelete onClick={() => { handleDeleteStory(items._id) }} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                  
                      <MdOutlineSettingsBackupRestore onClick={()=>{handlerestoreStory(items._id)}} className="my-[5px] text-yellow-500 cursor-pointer inline" />
                   
                  </td>
                
                </tr>
              ))
            }

          </tbody>
        </table>
      </Modal>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b ">
              <th>
              <button
                      onClick={handleMultidelete}
                      className="bg-red-500 px-4 rounded-sm py-1 text-white"> Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAll"
                  onClick={handleAllCheck}
                  checked={ifAllChecked}
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
            {
              story.map((item, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete"
                      value={item._id}
                      onClick={handleCheck}
                      checked={checked.includes(item._id)}
                      className="accent-[#5351c9] cursor-pointer input"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td className="object-contain p-1">
                    <img
                      src={filepath + item.thumbnail}
                      alt="story img"
                      width={80}
                      height={80}
                      className="rounded-[5px]"
                    />
                  </td>
                  <td className="p-1 object-contain">
                    <img
                      src={filepath + item.banner}
                      alt="story img"
                      width={150}
                      height={150}
                      className="rounded-[5px]"
                    />
                  </td>
                  <td className="w-[200px] p-2 text-justify tracking-tighter">
                    {item.descrption} {" "}
                    <span
                      onClick={() => setShowDesc1(!showDesc1)}
                      className={
                        showDesc1 === false ? "font-bold cursor-pointer" : "hidden"
                      }
                    >
                      ...Read
                    </span>
                    {/* {showDesc1 === false ? (
                    ""
                  ) : (
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Modi error, magni commodi doloribus quisquam itaque dolorem,
                      quae quas ex eligendi accusamus nulla. Voluptatum animi
                      cumque fuga ad accusamus similique nulla!
                    </span>
                  )} */}
                  </td>
                  <td>
                    <MdDelete onClick={() => { handleDeleteStory(item._id) }} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to={`/dashboard/stories/update-stories/${item._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td >
                  <button
                      data-tooltip-id="my-tooltip"
                      value={item._id}
                      onClick={handleUpdateStoryStatus}
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

export default ViewStory;
