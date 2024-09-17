
import { BASE_URL } from '../../utils';
import { useState } from 'react';
import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { setUser } from '../../Redux/Slice/user/userSlice';
const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handlerLogin = async()=>{
  
    console.log(username,password)

    try{
    
    const response = await axios.post(`${BASE_URL}/api/v1/user/login`, {
      username: username,
      password: password
      },{
        withCredentials:true
      });
      console.log(response.data)
      
      toast.success(response.data.message)
      dispatch(setUser(response.data.user))
      navigate('/')
    }catch(err:any){
      console.log(err)
      toast.error(err.response.data.message)
    }
  }
  return (
    <div className=" w-full h-[100vh] flex justify-center items-center" >
        <div className=" w-[40%] max-md:w-[95%]  p-5 bg-gray-300/50 h-72 rounded-md">
          
          <p className=" mx-1 my-2">Username :</p>
         <input type="text" value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          setUsername(e.target.value);
         }} className=" w-full h-10 border-2 rounded-md outline-none  bg-slate-400/30 border-blue-300" placeholder=" Enter your Email" />

         <p className=" mx-1 my-2">Password :</p>
         <input type="text" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          setPassword(e.target.value);
         }} className=" w-full h-10 border-2 rounded-md outline-none  bg-slate-400/30 border-blue-300" placeholder=" Enter your Password" />
            
        <div className=" w-full justify-center my-7 ">
            <button onClick={handlerLogin} className=" w-full bg-gradient-to-r from-cyan-500 to-blue-500  h-10 text-white  rounded-md font-semibold">Login</button>
        </div>
        </div>
    </div>
  )
}

export default Login