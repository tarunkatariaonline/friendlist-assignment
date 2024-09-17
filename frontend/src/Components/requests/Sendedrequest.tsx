import useRequestUsers from "../../hooks/useRequestsUsers"
import { BASE_URL } from "../../utils"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
const Sendedrequest = () => {
  const [updateApi,setUpdateApi] = useState(false)
  const data = useRequestUsers(`${BASE_URL}/api/v1/friendbook/getsendrequestfriendlist`,updateApi)
  
  // console.log(data)


  

  if(data.error){
    return <div>error in api</div>
  }

  if(data.loading===true){
    return <div>Loading...</div>
  }


 const handlerCancelRequest = async(id:string|null)=>{
    console.log(id)
  try{
    const response = await axios.post(`${BASE_URL}/api/v1/friendbook/cancelsendrequest/${id}`,{

      },{
        withCredentials:true
      })
      console.log(response.data)
      toast.success(response.data.message)
  }catch(err:any){
      toast.error(err.response.data.message)
  }

   setUpdateApi(!updateApi)
  }
  return (

    <div>
        
      
{data.users.length===0&&<div className=" w-full  flex-col justify-center items-center flex">
        
        <h1>No requests Sended yet ! </h1>
     
        
        <button className="bg-blue-500 max-md:font-semibold my-3 hover:bg-blue-300 text-white font-bold py-1 px-4 rounded">
       <Link to="/searchusers" className="text-white">Go to Search Users and send Request</Link>
      </button>
   
      </div> }
      {data.users.map((user)=>{
        return  <div key={user._id} className=" w-full  flex justify-center">
        <div  className="flex items-center bg-white p-2 w-[60%]  max-md:w-full  shadow-md justify-between border-b pb-4">
        {/* Profile Image */}
        <img
          src={BASE_URL+user.avatar}
          
          className="rounded-full w-12 h-12 object-cover mr-4"
        />
    
        {/* User Info */}
        <div className="flex-grow">
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-gray-600">@{user.username}</p>
        </div>
    
        {/* Add Friend Button */}
        <button onClick={()=>{
          handlerCancelRequest(user._id)
        }} className="bg-slate-500 max-md:font-semibold  hover:bg-slate-300 text-white font-bold py-1 px-4 rounded">
         Cancel Request
        </button>
        
      </div>
      </div>
      })}
   
  </div>
  )
}

export default Sendedrequest