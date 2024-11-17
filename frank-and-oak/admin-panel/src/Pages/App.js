import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function App() {
  const nav = useNavigate();

  const checkIfLoggedIn =()=>{
    const cookieData = Cookies.get("wsb-117_Boys")
    console.log(cookieData)
 
    if(cookieData) return nav('/dashboard')
   }
 
   useEffect(()=>{checkIfLoggedIn()},[])

  const handleLogin =(e)=>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_HOST}/api/admin-panel/admin/login`, e.target)
    .then((response)=>{
      console.log(response.data)
      // setProduct(response.data.data)
      Cookies.set("wsb-117_Boys", JSON.stringify(response.data), { expires: 1 })

      nav('/dashboard')
    })
    .catch((error)=>{
      console.log(error)
      if (error.status === 403){
        Swal.fire({
          icon: "error",
          title: "Incorrect Email",
          text: "The Email you entered is invalid. Please try again.",
          footer: 'Forgot your Email?'
        });
      }
      if (error.status === 401){
        Swal.fire({
          icon: "error",
          title: "Incorrect Password",
          text: "The password you entered is invalid. Please try again.",
          footer: 'Forgot your password?'
        });
      }
     
      
      })

  }

  

 


  return (
    <div className="mx-auto my-[100px] bg-white rounded-[10px] w-[40%] h-[400px] p-[20px] border">
      <h1 className="text-[#303640] font-semibold text-[40px] mt-[30px] p-[0_10px]">
        Login
      </h1>
      <h3 className="text-[#303640c2] text-[14px] p-[0_10px] mb-[30px]">
        Sign-in to your account
      </h3>
      <form method="post" onSubmit={handleLogin}>
        <div className="w-full  grid grid-cols-[20%_auto] my-[10px]">
          <label htmlFor="name" className="py-[8px] px-[10px] text-[#303640]">
            User Name
          </label>
          <input
            name="email"
            id="name"
            type="text"
            placeholder="Enter your email"
            className="p-[10px] rounded-[5px] border input"
          />
        </div>
        <div className="w-full  grid grid-cols-[20%_auto] my-[10px]">
          <label
            htmlFor="password"
            className="py-[8px] px-[10px] text-[#303640]"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="p-[10px] input border rounded-[5px]"
          />
        </div>
        <div className="w-full my-[50px] flex justify-between items-center">
       
            <button
              type="submit"
              className="w-[130px] bg-purple-600 text-white h-[40px] rounded-[5px] text-[18px] font-[400]"
            >
          
              Login
            </button>

          
          <Link to="/reset-password">
            <span className="text-[#5351c9] mr-[50px]">Forgot password?</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default App;
