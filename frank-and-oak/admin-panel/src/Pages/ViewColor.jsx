import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDeleteForever, MdOutlineSettingsBackupRestore } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const ViewColor = () => {
  const[color,setColor]= useState([])
  const [deletedColor, setDeletedColor] = useState([])
  const [checked,setChecked] = useState([]);
  const [ifAllChecked,setIfAllChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkedRestore,setCheckedRestore] = useState([]);
  const [ifAllCheckedRestore,setIfAllCheckedRestore] = useState(false);

  const fatchColor = ()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/color/viewColor`)
    .then((response)=>{
      console.log(response.data.data);
      setColor(response.data.data)
     
    })
    .catch((error)=>{
      console.log(error);
      })
  };

  const fatchDeletedColor = ()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/color/deleted-colorCategory`)
    .then((response)=>{
      console.log(response.data.data);
      setDeletedColor(response.data.data)
     
    })
    .catch((error)=>{
      console.log(error);
      })
  };
  useEffect(()=>{fatchColor(); fatchDeletedColor()},[]);

  const handleupdatestatus=(e)=>{
    console.log(e.target.value,e.target.textContent ) 
    const status =  e.target.textContent !== "Active";
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/color/update-status/${e.target.value}`,{status})
    .then((response)=>{
      console.log(response.data);
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status Updated",
        showConfirmButton: false,
        timer: 400
      });
      
      const index= color.findIndex((colorstatus)=> colorstatus._id === e.target.value)

      const newData = [...color]

      newData[index].status = status;

      setColor(newData)
     
    })
    .catch((error)=>{
      console.log(error);
      })
    

    
  }

  const handlecolordelete=(id)=>{

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

        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/color/delete-color/${id}`)
        .then((response)=>{
         console.log(response)
         setColor((pre)=>(
          pre.filter((colorstatus)=> colorstatus._id !== id)
         ))
         Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        fatchDeletedColor()
         
       })
       .catch((error)=>{
         console.log(error);
       })
       
      }
    });

  }

  const handleCheck=(e)=>{
    console.log(e.target.checked)
    if(e.target.checked){
      setChecked([...checked, e.target.value])
    }else{
      setChecked((pre)=>(
        pre.filter((item)=> item !== e.target.value)
      ))
    }
   
  }

  const handleAllCheck=(e)=>{
    setIfAllChecked(e.target.checked)

    // console.log(e.target.checked)
    if(e.target.checked){
      setChecked(color.map((item)=> item._id))
    }
    else{
      setChecked([])
    }

  }

  useEffect(()=>{
    setIfAllChecked(color.length === checked.length && color.length !== 0)
    setIfAllCheckedRestore(deletedColor.length === checkedRestore.length && deletedColor.length !== 0)
  },[color, checked, checkedRestore ])

  const handleMultiDelete = ()=>{
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

        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/color/multi-coloredelete`, {ids:checked})
        .then((response)=>{
         console.log(response)
         setColor((pre)=>(
          pre.filter((item)=> !checked.includes(item._id))
         ))

         setIfAllChecked(false)
         setChecked([])
         Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
         
       })
       .catch((error)=>{
         console.log(error);
       })
       
      }
    });
  }

  
  const handleCheckRestore=(e)=>{
    console.log(e.target.checked)
    if(e.target.checked){
      setCheckedRestore([...checkedRestore, e.target.value])
    }else{
      setCheckedRestore((pre)=>(
        pre.filter((item)=> item !== e.target.value)
      ))
    }
   
  }

  const handleAllCheckRestore=(e)=>{
    setIfAllCheckedRestore(e.target.checked)

    // console.log(e.target.checked)
    if(e.target.checked){
      setCheckedRestore(deletedColor.map((item)=> item._id))
    }
    else{
      setCheckedRestore([])
    }

  }

 const handleRestoreColor=(id)=>{
  axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/color/restore-color/${id}`)
  .then(()=>{
    fatchColor()
    fatchDeletedColor()
  })
  .catch((error)=>{
    console.log(error)
    })

 }

  return (
    <div className="w-[90%] bg-white rounded-[10px] border mx-auto my-[150px]">
       <Tooltip id="my-tooltip" />
      <div className="flex justify-between items-center h-[40px] border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] p-[8px_16px] text-[20px]">
       <h4>View Color</h4>
       <span className=" cursor-pointer" onClick={() => setOpen(true)}><MdDeleteForever /></span>
      </div>


      <Modal open={open} onClose={() => setOpen(false)} center>
      <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button className="bg-[#5351c9] font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]"
                onClick={handleMultiDelete}
                >
                 
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  className="cursor-pointer accent-[#5351c9] input"
                  onClick={handleAllCheckRestore}
                  checked={ifAllCheckedRestore}
                />
              </th>
              <th className="p-2">Sno.</th>
              <th className="p-2">Color Name</th>
              <th className="p-2">Color</th>
              <th className="p-2">Action</th>
    
            </tr>
          </thead>
          <tbody>
            {
              deletedColor.map((colors,index)=>{
                
                return(
                <>
                <tr className="border-b" key={index}>
                <td className="p-2">
                  <input
                    type="checkbox"
                    value={colors._id}
                    name="delete"
                    onClick={handleCheckRestore}
                    checked={checkedRestore.includes(colors._id)}
                    className="cursor-pointer accent-[#5351c9] input"
                  />
                </td>
                <td className="p-2">{index+1}</td>
                <td className="p-2">{colors.name}</td>
                <td className="p-2">
                  <div className={`w-[90%] mx-auto h-[20px]`} style={{
                    backgroundColor:colors.code
                  }}>{}</div>
                </td>
                <td className="p-2">
                  <MdDelete  onClick={()=>{handlecolordelete(colors._id)}} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                  |{" "}
                                  
                  <MdOutlineSettingsBackupRestore onClick={()=>{handleRestoreColor(colors._id)}} className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </td>
            
              </tr>
              </>
              )
})
            }
         
           
          </tbody>
        </table>
      </Modal>


      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button className="bg-[#5351c9] font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]"
                onClick={handleMultiDelete}
                >
                 
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  className="cursor-pointer accent-[#5351c9] input"
                  onClick={handleAllCheck}
                  checked={ifAllChecked}
                />
              </th>
              <th className="p-2">Sno.</th>
              <th className="p-2">Color Name</th>
              <th className="p-2">Color</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              color.map((colors,index)=>{
                
                return(
                <>
                <tr className="border-b" key={index}>
                <td className="p-2">
                  <input
                    type="checkbox"
                    value={colors._id}
                    name="delete"
                    onClick={handleCheck}
                    checked={checked.includes(colors._id)}
                    className="cursor-pointer accent-[#5351c9] input"
                  />
                </td>
                <td className="p-2">{index+1}</td>
                <td className="p-2">{colors.name}</td>
                <td className="p-2">
                  <div className={`w-[90%] mx-auto h-[20px]`} style={{
                    backgroundColor:colors.code
                  }}>{}</div>
                </td>
                <td className="p-2">
                  <MdDelete  onClick={()=>{handlecolordelete(colors._id)}} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                  |{" "}
                  <Link to={`/dashboard/color/update-colors/${colors._id}`}>
                
                    <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                  </Link>
                </td>
                <td className="p-2">
                  <button 
                  value={colors._id}
                   data-tooltip-id="my-tooltip"
                   onClick={handleupdatestatus}
                   data-tooltip-content={(colors.status) ? "Click to Inactive":"Click to Active"}
                  className={` text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer ${(colors.status) ? "bg-green-500":"bg-red-500"}`}
                  >
                   {(colors.status) ? "Active":"Inactive"}
                  </button>
                </td>
              </tr>
              </>
              )
})
            }
         
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewColor;
