import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDeleteForever, MdOutlineSettingsBackupRestore } from "react-icons/md";
import { Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import Swal from "sweetalert2";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  let [show3, setShow3] = useState(false);
  let [show4, setShow4] = useState(false);

  const [categories, setCategories] = useState([]);
  const [deletedCategories,setdeletedCategories] =useState([])
  const [checked, setChecked] = useState([]);
  const [ifAllChecked, setIfAllChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkedRestore, setCheckedRestore] = useState([]);
  const [ifAllCheckedRestore, setIfAllCheckedRestore] = useState(false);

  const fatchCategory = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/read-category`)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const fatchDeletedCategory = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/deleted-categories`)
      .then((response) => {
        // console.log(response.data);
        setdeletedCategories(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  };
  useEffect(() => { fatchCategory(); fatchDeletedCategory(); }, []);

  const handleUpdateStatus = (e) => {
    const status = e.target.textContent !== "Active";
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/update-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Status Updated",
          showConfirmButton: false,
          timer: 400
        });

        const index = categories.findIndex((cat) => cat._id === e.target.value)
        const newData = [...categories]
        newData[index].status = status
        setCategories(newData)
      })
      .catch((error) => {
        console.log(error);
      })

  }

  const handledeletecat = (id) => {

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
        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/delete-category/${id}`)
          .then((response) => {
            setCategories((pre) => (
              pre.filter((categoryy) => categoryy._id !== id)
            ))
            Swal.fire({
              title: "Deleted!",
              text: "Your category has been deleted.",
              icon: "success"
            });
            fatchDeletedCategory()

          })
          .catch((error) => {
            console.log(error);
          })

      }
    });


  };

  const handleCheck = (e) => {
    // console.log(e.target.checked)
    if (e.target.checked) {
      setChecked([...checked, e.target.value])
    } else {
      setChecked((pre) => (
        pre.filter((item) => item !== e.target.value)
      ))
    }

  }

  const handleAllCheck = (e) => {
    setIfAllChecked(e.target.checked)

    if (e.target.checked) {
      setChecked(categories.map((item) => item._id))

    }
    else {
      setChecked([])
    }

  }

  useEffect(() => {
    setIfAllChecked(categories.length === checked.length && categories.length !== 0)
    setIfAllCheckedRestore(deletedCategories.length === checkedRestore.length && deletedCategories.length !== 0)
  }, [categories, checked, checkedRestore, deletedCategories])

  const handleMultiDelete = () => {
    if(checked.length===0) return

    // console.log(checked)
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
        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/multi-deleteCategory`, { ids: checked })
          .then((response) => {
            setCategories((pre) => (
              pre.filter((item) => !checked.includes(item._id))
            ))

            setIfAllChecked(false)
            setChecked([])
            Swal.fire({
              title: "Deleted!",
              text: "Your category has been deleted.",
              icon: "success"
            });

            // fatchCategory()

          })
          .catch((error) => {
            console.log(error);
          })

      }
    });


  }

  const handleCheckRestore = (e) => {
    // console.log(e.target.checked)
    if (e.target.checked) {
      setCheckedRestore([...checkedRestore, e.target.value])
    } else {
      setCheckedRestore((pre) => (
        pre.filter((item) => item !== e.target.value)
      ))
    }

  }

  const handleAllCheckRestore = (e) => {
    console.log(e.target.checked)
    setIfAllCheckedRestore(e.target.checked)

    if (e.target.checked) {
      setCheckedRestore(deletedCategories.map((items) => items._id))

    }
    else {
      setCheckedRestore([])
    }

  }

  const restoreCategory= (id)=>{
     axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/restore-category/${id}`)
     .then(()=>{
      fatchCategory()
      fatchDeletedCategory()
      setOpen(false)
     })
     .catch((error)=>{
      console.log(error)
      })
  }

  


  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <Tooltip id="my-tooltip" />
      <div className=" items-center justify-between h-[40px] flex  bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        <h4>View Category</h4>
        <span className=" cursor-pointer" onClick={() => setOpen(true)}><MdDeleteForever /></span>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} center>

        {
          (deletedCategories.length===0) ? (<h1>No Data Found</h1>): 
               <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button

                  className="bg-red-500 rounded-sm px-2 py-1"
                  onClick={handleMultiDelete}
                >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleAllCheckRestore}
                  className="accent-[#5351c9]"
                  checked={ifAllCheckedRestore}

                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>

            </tr>
          </thead>
          <tbody>
            {
              deletedCategories.map((category, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      value={category._id}
                      className="accent-[#5351c9] cursor-pointer"
                      onClick={handleCheckRestore}
                      checked={checkedRestore.includes(category._id)}

                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                    <span
                      onClick={() => setShow1(!show1)}
                      className={
                        show1 === true ? "hidden" : "font-bold cursor-pointer"
                      }
                    >
                      ...Read
                    </span>
                    {show1 === false ? (
                      " "
                    ) : (
                      <span>
                        {category.description}
                      </span>
                    )}
                  </td>
                  <td>
                    <MdDelete   className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <MdOutlineSettingsBackupRestore onClick={()=>{restoreCategory(category._id)}} className="my-[5px] text-yellow-500 cursor-pointer inline" />

                  </td>
                 
                </tr>
              ))
            }



          </tbody>
        </table>
        }
  
      </Modal>

      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button

                  className="bg-red-400 rounded-sm px-2 py-1"
                  onClick={handleMultiDelete}
                >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleAllCheck}
                  className="accent-[#5351c9]"
                  checked={ifAllChecked}

                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map((category, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      value={category._id}
                      className="accent-[#5351c9] cursor-pointer"
                      onClick={handleCheck}
                      checked={checked.includes(category._id)}

                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                    <span
                      onClick={() => setShow1(!show1)}
                      className={
                        show1 === true ? "hidden" : "font-bold cursor-pointer"
                      }
                    >
                      ...Read
                    </span>
                    {show1 === false ? (
                      " "
                    ) : (
                      <span>
                        {category.description}
                      </span>
                    )}
                  </td>
                  <td>
                    <MdDelete onClick={() => { handledeletecat(category._id) }} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to={`/dashboard/category/update-category/${category._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>

                    <button
                      data-tooltip-id="my-tooltip"
                      value={category._id}
                      onClick={handleUpdateStatus}
                      data-tooltip-content={(category.status) ? "Click to Inactive" : "Click to Active"}
                      className={`p-[4px_10px] rounded-sm ${(category.status) ? "bg-green-500" : "bg-red-500"}  text-white`}
                    >
                      {(category.status) ? "Active" : "Inactive"}
                    </button>
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

export default ViewCategory;
