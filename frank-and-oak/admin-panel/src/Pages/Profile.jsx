import React, { useEffect, useState, CSSProperties } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
  position:"fixed",
  top:"50%",
  left:"50%",
  transform:"translate(-50%,-50%)",
  zIndex:"999999"
  
};


function Profile() {

  

  const [show, setShow] = useState(false);
  const [adminData, setAdminData] = useState({})
  const [filePath, setFilPath] = useState('')
  const [previews, setPreviews] = useState({})
  const [ifOtp, setIfOtp] = useState(false)
  const [otptext,setOtpText]= useState('Genrate OTP')

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const nav = useNavigate()

  

  const fetchAdminData = () => {
    const cookieData = JSON.parse(Cookies.get("wsb-117_Boys"))
    console.log(cookieData.email)
    setAdminData(cookieData.data)

    setFilPath(cookieData.filePath)
  }
  
  useEffect(() => { fetchAdminData() }, [])

  const handlePreview = (e) => {

    const { name, files } = e.target;

    const url = URL.createObjectURL(files[0])

    setPreviews({ ...previews, [name]: url })
    // console.log({...previews, [name]: url })

    // console.log(url)
  }

  const handleupdateAdmin = (e) => {
    e.preventDefault();
console.log('sdwwd',adminData);
console.log("hello",e.target)
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/admin/update-admin/${adminData._id}`, e.target)
    
      .then((response) => {
        console.log('data', response.data)

        let timerInterval;
        Swal.fire({
          title: "Admin Updateted!",
          html: "Please Log In Again <b></b> milliseconds.",
          timer: 800,
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
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            Cookies.remove("wsb-117_Boys")
            nav('/')
          }
        });


        // setProduct(response.data.data)
        // Cookies.set("wsb-117_Boys", JSON.stringify(response.data), { expires: 1 })

        // nav('/dashboard')
      })
      .catch((error) => {
        console.log(error)
      })

  }

  const notify=()=>{
    setLoading(true)
     axios.post(`${process.env.REACT_APP_API_HOST}/api/admin-panel/admin/genrate-otp`, {email:adminData.email})
     .then((response)=>{
      setLoading(false)
      console.log(response)
      toast("OTP has been sent to your email");
      setIfOtp(true)
      

      let counter = 120;

      setOtpText('Regenrate OTP in 120s')

      const otpInterval = setInterval(() => {
        counter --
        setOtpText(`Regenrate OTP in ${counter}s`)

        if(counter<1) {
          clearInterval(otpInterval);
          setOtpText('Genrate OTP')
          setIfOtp(false)
          }
      }, 1000);
     })
     .catch((error)=>{
      console.log(error)
      })
     }

     const handleUpdateEmail=(e)=>{
      e.preventDefault()
      axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/admin/update-email`, {
        email:adminData.email,
        newEmail:e.target.newemail.value,
        userOtp:e.target.userotp.value
      })
      .then((response)=>{
        console.log(response)

        
        let timerInterval;
        Swal.fire({
          title: "Admin Updateted!",
          html: "Please Log In Again <b></b> milliseconds.",
          timer: 800,
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
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            Cookies.remove("wsb-117_Boys")
            nav('/')
          }
        });
        
      })
      .catch((error)=>{
        console.log(error)
        })
     }


  return (
    <div>
<div className="w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.3)] fixed top-0 left-0 z-[99999]" style={{display: (loading) ? '': 'none'}}>
<ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      <div className="w-[90%] mx-auto mt-[140px] mb-[20px] bg-white border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Profile
        </span>
        <div className="w-full">
          <div className="p-[10px]">
            <form method="post" onSubmit={handleupdateAdmin}>
              <div className="grid grid-cols-[1fr_1fr] gap-2">
                <div>
                  <div className="w-full ">
                    <span className="block m-[15px_0]">Name</span>
                    <input
                      type="text"

                      name="name"
                      value={adminData.name}
                      onChange={(e) => { setAdminData({ ...adminData, name: e.target.value }) }}

                      className="w-full border h-[35px] rounded-[5px] p-2 input"
                    />
                  </div>
                  <div className="w-full ">
                    <span className="block m-[15px_0]">Social Link</span>
                    <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                      <span className="w-full h-full text-[20px] p-[8px]">
                        <RiFacebookFill />
                      </span>
                      <input
                        type="text"
                        value={adminData.facebook}
                        name="facebook"
                        onChange={(e) => { setAdminData({ ...adminData, facebook: e.target.value }) }}
                        className="w-full border h-[35px] rounded-[5px] p-2 input"
                      />
                    </div>
                    <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                      <span className="w-full h-full text-[20px] p-[8px]">
                        <CiInstagram />
                      </span>
                      <input
                        type="text"
                        value={adminData.instagram}
                        name="instagram"
                        onChange={(e) => { setAdminData({ ...adminData, instagram: e.target.value }) }}
                        className="w-full border h-[35px] rounded-[5px] p-2 input"
                      />
                    </div>
                    <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                      <span className="w-full h-full text-[20px] p-[8px]">
                        <FaYoutube />
                      </span>
                      <input
                        type="text"
                        value={adminData.youtube}
                        name="youtube"
                        onChange={(e) => { setAdminData({ ...adminData, youtube: e.target.value }) }}
                        className="w-full border h-[35px] rounded-[5px] p-2 input"
                      />
                    </div>
                    <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                      <span className="w-full h-full text-[20px] p-[8px]">
                        <FaXTwitter />
                      </span>
                      <input
                        type="text"

                        name="twitter"
                        value={adminData.twitter}
                        onChange={(e) => { setAdminData({ ...adminData, twitter: e.target.value }) }}
                        className="w-full border h-[35px] rounded-[5px] p-2 input"
                      />
                    </div>
                  </div>
                  <div className="w-full my-[20px]">
                    <span className="block m-[15px_0]">Logo</span>
                    <div className="w-[50px] h-[50px] object-fill">
                      <img src={previews.logo || filePath + adminData.logo} alt="Logo" className="w-full h-full" />
                    </div>
                    <input
                      type="file"
                      name="logo"
                      className="input border w-full m-[10px_0] category"
                      onChange={handlePreview}

                    />
                  </div>
                  <div className="w-full my-[20px]">
                    <span className="block m-[15px_0]">Fav Icon</span>
                    <div className="w-[50px] h-[50px] object-fill">
                      <img
                        src={previews.fevicon || filePath + adminData.fevicon}
                        alt="Logo"
                        className="w-full h-full"
                      />
                    </div>
                    <input
                      type="file"
                      name="fevicon"
                      className="input border w-full m-[10px_0] category"
                      onChange={handlePreview}
                    />
                  </div>
                  <div className="w-full my-[20px]">
                    <span className="block m-[15px_0]">Footer Logo</span>
                    <div className="w-[50px] h-[50px] object-fill">
                      <img
                        src={previews.footer_logo || filePath + adminData.footer_logo}
                        alt="footer_logo"
                        className="w-full h-full"

                      />
                    </div>
                    <input
                      type="file"
                      name="footer_logo"
                      className="input border w-full m-[10px_0] category"
                      onChange={handlePreview}
                    />
                  </div>
                  <div className="w-full my-[20px] relative ">
                    <span className="block m-[15px_0]">Password</span>
                    <input
                      type={show === false ? "password" : "text"}
                      value={adminData.password}
                      name="password"
                      onChange={(e) => { setAdminData({ ...adminData, password: e.target.value }) }}
                      className="w-full border h-[35px] rounded-[5px] p-2 input"
                    />
                    <span
                      onClick={() => setShow(!show)}
                      className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
                    >
                      {show === false ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col  p-[10px] box-border items-center gap-[10px] h-[400px]">
                  <div className="border border-slate-300 w-[200px] h-[200px] rounded-[50%] object-contain">
                    <img
                      src={previews.thumbnail || filePath + adminData.thumbnail}
                      alt="thumbnail"
                      className="w-full h-full rounded-[50%]"
                    />
                  </div>
                  <span className="block text-center">Profile Image</span>
                  <button type="button" class="py-2 px-3 inline-flex items-center text-xs font-medium rounded-lg border border-transparent bg-black text-white hover:border-black hover:text-black hover:bg-white focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-file-upload-trigger="">
                    <input type="file" className=" cursor-pointer" name="thumbnail" onChange={handlePreview} />
                    <svg className="shrink-0 size-4 disabled: cursor-no-drop" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>

                  </button>
                </div>
              </div>


              <button type="submit" className="w-[150px] h-[40px] rounded-md text-white bg-[#5351c9] my-[30px]">
                Update
              </button>

            </form>
          </div>

        </div>
      </div>
      <div className="mb-[80px] w-[90%] mx-auto border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Update Email
        </span>
        <div className="w-full p-[30px]">
          <form method="post" onSubmit={handleUpdateEmail}>
            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">Current Email</span>
              <input
                type="email"
                name="email"
                value={adminData.email}
                readOnly
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <div className={`w-full mb-[10px]  ${(ifOtp) ? 'block':'hidden'}`}>
              <span className="block m-[15px_0]">OTP</span>
              <input
                type="text"
                placeholder="Enter OTP"
                name='userotp'

                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
              <input
                type="text"
                placeholder="Enter new email"
                name='newemail'

                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <button
              type="button"
              onClick={notify }
              disabled={ifOtp}
              className={`px-3 h-[40px]  ${(ifOtp) ? 'bg-gray-300  cursor-progress':'bg-[#5351c9]'}  rounded-md text-white  my-[30px]`}>
              {otptext}
            </button>
            <ToastContainer />
            <button

              type="submit"

              className={`w-[150px]  h-[40px] rounded-md text-white bg-[#5351c9]  ${(ifOtp) ? 'block':'hidden'}  my-[30px]`}>
              Update Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
