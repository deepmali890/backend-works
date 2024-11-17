import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { IoKey } from "react-icons/io5";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { TiArrowBack } from "react-icons/ti";

function ForgotPassword() {
    let invalidOTPChars=["+","-","e","."];

    const [ifotp,setIfOtp] = useState(false)
    const [otpText,setOtpText] = useState('Genrate OTP')
    const [adminData, setAdminData] = useState({})

  


    const handleForgetPass=(e)=>{
      e.preventDefault();
      axios.post(`${process.env.REACT_APP_API_HOST}/api/admin-panel/admin/forget-password`, e.target)
      .then((response)=>{
        console.log(response.data)
        // Cookies.set("wsb-117_Boyss", JSON.stringify(response.data), { expires: 1 })
      })
      .catch((error)=>{
        console.log(error)
        })
      
    }

      

    
  return (
    <div className="mx-auto my-[100px] bg-white rounded-[10px] w-[40%] p-[20px] border">
      <h1 className="text-[#303640] font-semibold text-[40px] mt-[30px] p-[0_10px]">
        Forgot Password
      </h1>

      <form method="post" onSubmit={handleForgetPass}>
        <div className="w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border">
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <HiOutlineMail />
          </span>
          <input
            name="email"
            id="name"
            type="text"
            placeholder="Email"
            className="p-[10px] border-l input rounded-[0_5px_5px_0]"
          />
        </div>
        <div className={`w-full my-[10px]  rounded-[5px] border ${(ifotp) ? "block":"hidden" } `}>
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <CiLock />
          </span>
          <input
            name="new_password"
            id="new_password"
            type="password"
            placeholder="New password"
            className="p-[10px] border-l input rounded-[0_5px_5px_0]"
          />
        </div>
        <div className={`w-full my-[10px]  rounded-[5px] border hidden`}>
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
        </div>

        
        <div className={`w-full my-[10px]  rounded-[5px] border hidden`}>
        {/* grid grid-cols-[40px_auto] */}
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
        </div>

      
            <button
              type="submit"
              // onClick={handleGerateOtp}
              className="w-[130px] bg-purple-600 text-white h-[35px] rounded-[5px] font-[400]"
            >
              {otpText}
            </button>
    
        <div className="w-full my-[30px] flex justify-between items-center">
          
          <Link to={"/"}>
            <div
              type="button"
              className="  hover:underline  flex items-center gap-3 h-[35px] rounded-[5px] font-[400]"
            >
            <TiArrowBack />  Return to Login
            </div>
          </Link>

   
           
       
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
