import React, { useState } from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { IoKey } from "react-icons/io5";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function NewPassword() {
    let invalidOTPChars=["+","-","e","."];

    const [password,setpassword] = useState("")
    const [msg,setmsg] = useState("success")
    const{id,token}= useParams()

    const nav = useNavigate()

    const setval =(e)=>{
        setpassword(e.target.value);
    }

    const sendEmail = (e) => {
        e.preventDefault();
        
        axios.post(`${process.env.REACT_APP_API_HOST}/api/admin-panel/admin/final-password/${id}/${token}`, JSON.stringify({ password }),  {
          headers: {
              "Content-Type": "application/json",  // Ensure the server understands the request body as JSON
          },
      })
            .then((response) => {
                console.log(response.data);
                setmsg(true)
                nav("/")
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
  return (
    <div>
         <div className="mx-auto my-[100px] bg-white rounded-[10px] w-[40%] p-[20px] border">
      <h1 className="text-[#303640] font-semibold text-[40px] mt-[30px] p-[0_10px]">
        New Password
      </h1>

      <form method="post" onSubmit={sendEmail} >
      
        <div className={`w-full my-[10px]  rounded-[5px] border  grid grid-cols-[40px_auto] `}>
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <CiLock />
          </span>
          <input
            name="new_password"
            id="new_password"
            type="password"
            value={password}
            onChange={setval}
            placeholder="New password"
            className="p-[10px] border-l input rounded-[0_5px_5px_0]"
          />
        </div>
        {/* <div className={`w-full my-[10px]  rounded-[5px] border  grid grid-cols-[40px_auto]`}>
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <CiLock />
          </span>
          <input
            name="confirm_password"
            id="confirm_password"
            type="password"
            placeholder="Confirm password"
            className="p-[10px] border-l input rounded-[0_5px_5px_0]"
          />
        </div> */}

{/*         
        <div className={`w-full my-[10px]  rounded-[5px] border  grid grid-cols-[40px_auto] `}>
       
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <IoKey />
          </span>
          <input
            name="otp"
            id="otp"
            type="number"
            placeholder="OTP"
            min={0}
            className="p-[10px] border-l input rounded-[0_5px_5px_0] number"
            onKeyDown={(e)=>{if(invalidOTPChars.includes(e.key))e.preventDefault();}}
          />
        </div> */}

      
            <button
              type="submit"
              // onClick={handleGerateOtp}
              className="w-[130px] bg-purple-600 text-white h-[35px] rounded-[5px] font-[400]"
            >
              Login
            </button>
    
       
      </form>
    </div>
    </div>
  )
}

export default NewPassword
