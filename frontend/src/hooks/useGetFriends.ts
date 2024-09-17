import { useEffect, useState } from "react"
import { useAppSelector } from "../Redux/hooks"
import axios from "axios"
import { BASE_URL } from "../utils"
import { setUser, UserState } from "../Redux/Slice/user/userSlice"
import { compose } from "redux"
const useGetFriends = (query:string,updateApi:boolean)=>{
    const [friends,setFriends] = useState<UserState[]|[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const [error,setError] = useState<boolean>(false)
    
  const user = useAppSelector((state)=>state.user)

  const fetchUserFriends  =async()=>{
    setLoading(true)
    setFriends([])
   setError(false)
   console.log("hello i am in fetch user friends")
   try{
    

     const response = await axios.get(`${BASE_URL}/api/v1/friendbook/friendlist/${user._id}?query=${query}`,{
       withCredentials:true
     })
     console.log(response.data.friends)
     setFriends(response.data.friends)

     console.log("hello i am in api fetch")
 
     
   }catch(err:any){
    console.log(err.response.data)
    setError(true)
   }
   setLoading(false)
   }
   useEffect(()=>{
  if(user._id!==null)
        fetchUserFriends()
 
   },[user,query,updateApi])
 return {friends,loading,error}
}

export default useGetFriends