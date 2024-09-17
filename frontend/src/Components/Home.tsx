
import { MdSearch } from "react-icons/md";

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import useGetFriends from "../hooks/useGetFriends";


import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Home = () => {
  const [query,setQuery] = useState<string>('')
  const [updateApi,setUpdateApi] = useState<boolean>(false)
const data= useGetFriends(query,updateApi)

console.log(data)

const handlerRemoveFriend = async(id:string|null)=>{
  console.log(id)
  try{
  const res = await axios.delete(`${BASE_URL}/api/v1/friendbook/removefriend/${id}`,{
    withCredentials:true
  })
  console.log(res.data)
  toast.success(res.data.message)
  }catch(err:any){
    toast.error(err.res.data.message)
  }
  setUpdateApi(!updateApi)
}
   
if(data.error){
  return <div>error in api fetch !</div>
}
  return (
    <div className=' h-[100vh] bg-gray-100'>
      <div className='  h-full w-full '>

       

        <div className=" w-full  flex justify-center">
  
  {(query.length===0 && data.friends.length===0)?"": <div  className="flex items-center h-14 my-10 bg-white p-2 w-[60%]  max-md:h-10 max-md:w-[95%]  shadow-md  border-b ">
    
    <MdSearch size={26} className=" mx-2 h-full "/>
    <input type="text" value={query} onChange={(e)=>{
      setQuery(e.target.value)
    }} className=" w-full h-full text-lg outline-none" placeholder="Search Users here" />
   
  </div>} 
  </div>


{(query.length===0 && data.friends.length===0)&&<div className=" w-full  flex-col justify-center items-center flex">
        
        <h1>You don't have Friends ! </h1>
     
        
        <button className="bg-blue-500 max-md:font-semibold my-3 hover:bg-blue-300 text-white font-bold py-1 px-4 rounded">
       <Link to="/searchusers" className="text-white">Go and Find Friends !</Link>
      </button>
   
      </div> }


      {(query.length!==0 && data.friends.length===0)&&<div className=" w-full  flex-col justify-center items-center flex">
        
        <h1>You don't have This name Friend ! </h1>
     
        
       
   
      </div> }
  



         {data.friends.map((friend)=>{
          return <div key={friend._id} className=' w-full flex justify-center my-10'>
          
          <div className=' w-[60%] max-md:w-full   bg-white shadow-md rounded-md flex max-md:block items-center justify-between p-3'>

           <div className=" flex items-center max-md:block">
            <div className=' w-36 h-36 max-md:w-full items-center max-md:40 flex justify-center    rounded-full '>
             <img className=' rounded-full w-32 h-32' src={BASE_URL+friend.avatar} alt="" />
            </div>

            <div className=' px-2'>
              <p className=' text-lg'>{friend.name}</p>
              <p  className=' text-lg' >@{friend.username}</p>
              <p className=' text-lg'>{friend.email} </p>
              <p className=' text-lg'>{friend.phoneno}</p>
              
            </div>
            </div>
            <div onClick={()=>{
              handlerRemoveFriend(friend._id)
            }} className='  max-md:flex  max-md:w-full justify-center items-center '>
              <button className=' p-2  text-white text-md font-semibold  bg-red-500 hover:bg-red-600 rounded-md'>Remove Friend</button>
            </div>
          </div>
            
         </div>
         })}

      </div>
    </div>
  )
}

export default Home