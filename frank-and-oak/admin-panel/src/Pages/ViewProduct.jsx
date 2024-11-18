import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewProduct = () => {
  let [showDesc1, setShowDesc1] = useState(false);
  let [showShortDesc1, setShowShortDesc1] = useState(false);

  const [showProduct, setShowProduct] = useState([])
  const [filepath, setfilepath] = useState("")

  const fatchProduct = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/products/read-product`)
      .then((res) => {
        console.log(res.data);
        setShowProduct(res.data.data)
        setfilepath(res.data.filepath)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleUpdateStatus =(e)=>{
    const status = e.target.textContent !== "Active";
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/products/update-status/${e.target.value}` ,{status})
    .then((res) => {
      console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status Updated",
        showConfirmButton: false,
        timer: 400
      });
      // fatchProduct()

     const index = showProduct.findIndex((products)=> products._id === e.target.value)
      const newData = [...showProduct]
      newData[index].status = status
      setShowProduct(newData)

 
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleDeleteProduct = (id)=>{

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
        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/products/delete-product/${id}`)
        .then((res) => {
          console.log(res);
          setShowProduct((pre)=>(
            pre.filter((productss)=> productss._id !== id)
           
          ))
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          fatchProduct()
      })
      .catch((err) => {
        console.log(err);
        })
       
      }
    });
  

  }

  useEffect(() => { fatchProduct() }, [])
  return (
    <div className="w-[90%] mx-auto my-[150px] rounded-[10px] bg-white border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] font-bold p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Product
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex gap-[5px]">
                Delete{" "}
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="delete"
                  className="input accent-[#5351c9] cursor-pointer h-[fit-content] m-[5px]"
                />
              </th>
              <th>Sno</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Short Description</th>
              <th>Thumbnail</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

            {
              showProduct.map((item, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      id="delete"
                      name="delete"
                      className="input accent-[#5351c9] cursor"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td className="w-[200px] p-2">
                    {item.description}.{" "}
                    <span
                      className={
                        showDesc1 === false ? "font-bold cursor-pointer" : "hidden"
                      }
                      onClick={() => setShowDesc1(!showDesc1)}
                    >
                      ...Read
                    </span>
                    {/* {showDesc1 === false ? (
                    ""
                  ) : (
                    <span>
                      {" "}
                      Ea explicabo minus doloribus asperiores! Suscipit illum,
                      assumenda nesciunt libero non ea quos consequatur vel.
                      Temporibus, nobis perspiciatis veritatis suscipit hic illum!
                    </span>
                  )} */}
                  </td>
                  <td className="w-[200px] p-2">
                    {item.short_description}{" "}
                    <span
                      className={
                        showShortDesc1 === false
                          ? "font-bold cursor-pointer"
                          : "hidden"
                      }
                      onClick={() => setShowShortDesc1(!showShortDesc1)}
                    >
                      ...Read
                    </span>
                    {/* {showShortDesc1 === false ? (
                    ""
                  ) : (
                    <span>
                      {" "}
                      Ea explicabo minus doloribus asperiores! Suscipit illum,
                      assumenda nesciunt libero non ea quos consequatur vel.
                      Temporibus, nobis perspiciatis veritatis suscipit hic illum!
                    </span>
                  )} */}
                  </td>
                  <td className="object-contain">
                    <img
                      src={filepath + item.thumbnail}
                      alt="men's t-shirt"
                      width={80}
                      height={80}
                      className="rounded-[5px]"
                    />{" "}
                  </td>
                  <td>
                    <MdDelete onClick={()=> {handleDeleteProduct(item._id)}} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to={`/dashboard/products/update-product/${item._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button
                      data-tooltip-id="my-tooltip"
                      value={item._id}
                      onClick={handleUpdateStatus}
                      data-tooltip-content={(item.status) ? "Click to Inactive" : "Click to Active"}
                      className={`p-[4px_10px] rounded-sm ${(item.status) ? "bg-green-500" : "bg-red-500"}  text-white`}>
                      {(item.status) ? "Active" : "Inactive"}
                    </button></td>
                    <Tooltip id="my-tooltip" />
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProduct;
