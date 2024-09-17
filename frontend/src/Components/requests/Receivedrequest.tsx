import { useState } from "react"
import useRequestUsers from "../../hooks/useRequestsUsers"
import { BASE_URL } from "../../utils"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"


const Receivedrequest = () => {
  const [updateApi,setUpdateApi] = useState(false)
  const data = useRequestUsers(`${BASE_URL}/api/v1/friendbook/getreceivedfriendlist`,updateApi)
  // console.log(data)

  if(data.error){
    return <div>error</div>
  }

  const  handlerAccepRequest = async(id:string|null)=>{
    try{
      console.log(id)
    const response = await axios.post(`${BASE_URL}/api/v1/friendbook/acceptfriendrequest/${id}`,{

    },{
      withCredentials:true
    })
    console.log(response.data)
    toast.success(response.data.message)
    }catch(err:any){
      console.log(err)
      toast.success(err.response.data.message)
    }
    setUpdateApi(!updateApi)
  }


  const handlerRejectRequest = async(id:string|null)=>{
    console.log(id)
    try{
      const response = await axios.post(`${BASE_URL}/api/v1/friendbook/rejectfriendrequest/${id}`,{},{
        withCredentials:true
      })
      console.log(response.data)
      toast.success(response.data.message)
    }catch(err:any){
      toast.success(err.response.data.message)
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
       
        <img
          src={BASE_URL+user.avatar}
          
          className="rounded-full w-12 h-12 object-cover mr-4"
        />
    
    
        <div className="flex-grow">
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-gray-600">@{user.username}</p>
        </div>
    
      
        <button onClick={()=>{
          handlerAccepRequest(user._id)
        }} className="bg-blue-500 max-md:font-semibold hover:bg-blue-600 text-white font-bold py-1 px-4 rounded">
         Accept
        </button>
        <button onClick={()=>{
          handlerRejectRequest(user._id)
        }} className=" ml-2 bg-red-500 max-md:font-semibold max-md:text-sm hover:bg-red-600 text-white font-bold py-1 px-4 rounded">
          Reject
        </button>
      </div>
      </div>
      })}
   
  </div>
  )
}

export default Receivedrequest