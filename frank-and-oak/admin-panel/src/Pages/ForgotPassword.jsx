import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { IoKey } from "react-icons/io5";
function ForgotPassword() {
    let invalidOTPChars=["+","-","e","."];
  return (
    <div className="mx-auto my-[100px] bg-white rounded-[10px] w-[40%] p-[20px] border">
      <h1 className="text-[#303640] font-semibold text-[40px] mt-[30px] p-[0_10px]">
        Forgot Password
      </h1>

      <form>
        <div className="w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border">
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <HiOutlineMail />
          </span>
          <input
            name="u_name"
            id="name"
            type="text"
            placeholder="Email"
            className="p-[10px] border-l input rounded-[0_5px_5px_0]"
          />
        </div>
        <div className="w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border">
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
        <div className="w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border">
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
        <div className="w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border">
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
        <div className="w-full my-[30px] flex justify-between items-center">
          <Link to={"/dashboard"}>
            <button
              type="submit"
              className="w-[130px] bg-purple-600 text-white h-[35px] rounded-[5px] font-[400]"
            >
              Next
            </button>
          </Link>
          <Link to={"/login"}>
            <button
              type="button"
              className="w-[130px] bg-purple-600 text-white h-[35px] rounded-[5px] font-[400]"
            >
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
