import { useEffect} from "react"
import axios from "axios"
import { BASE_URL } from "../utils"
import {  useAppDispatch } from '../Redux/hooks'

import { setUser } from "../Redux/Slice/user/userSlice"
const useUserDetails = ()=>{

  const dispatch = useAppDispatch()
const fetchUserDetails = async()=>{
    try{
    const response = await axios.get(`${BASE_URL}/api/v1/user/aboutme`,{
    
        withCredentials:true
    });
    // console.log(response.data.user)
    
   
    dispatch(setUser(response.data.user))

 
  
    }catch(err:any){
        console.log(err)
    }
}
useEffect(()=>{
   fetchUserDetails()
},[])
}

export default useUserDetails