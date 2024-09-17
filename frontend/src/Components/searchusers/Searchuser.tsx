import { MdSearch } from "react-icons/md"
import Usercard from "./Usercard"
import useSearchUsers from "../../hooks/useSearchUsers"
import { useState } from "react"
import { useAppSelector } from "../../Redux/hooks"


const Searchuser = () => {

   const [query,setQuery] = useState<string>('')
   const logedUser = useAppSelector((state) => state.user)
   console.log(logedUser)

   const data  =  useSearchUsers(query)
   console.log(data)
  
   if(data.error){
    return <div>error in api fetch...</div>
   }

   
  return (
    <div className=" w-full  bg-gray-100 min-h-[100vh]">
   <div className=" w-full  flex justify-center">
    <div  className="flex items-center h-14 my-10 bg-white p-2 w-[60%]  max-md:h-10 max-md:w-[95%]  shadow-md  border-b ">
    
    <MdSearch size={26} className=" mx-2 h-full "/>
    <input value={query} onChange={(e)=>{
      setQuery(e.target.value)
    }} type="text" className=" w-full h-full text-lg outline-none" placeholder="Search Users here" />
   
  </div>
  </div>



  {data.loading&&<div>loading....</div>}
  {query.length===0&&<div>Search users please here by username,name,email</div>}


     {(data.searchUsers.length===0&&query.length!==0)&&<div>no user found</div>}


     {data.searchUsers.map((user)=>{
      return (logedUser._id!==user._id)&&<Usercard key={user._id} user={user} />
    })} 
     </div>
  )
}

export default Searchuser