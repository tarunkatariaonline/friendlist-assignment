import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { setUser, UserState } from '../Redux/Slice/user/userSlice'
const Header = () => {
    const navigate = useNavigate()
       
    const loggedUser = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const handlerLogout = async()=>{
      

        try{
        const res = await axios.get(`${BASE_URL}/api/v1/user/logout`,{
            withCredentials:true
        })
        console.log(res.data)
        toast.success("Logout successfully !")
        const exampleUser:UserState ={
            _id:null,
            name:null,
            email:null,
            avatar:'',
            phoneno:null,
            username:null,
            hobbies:['']

        }
        dispatch(setUser(exampleUser))
        navigate('/login')
        
        }catch(err){
            console.log(err)
        }
    }
  return (

    <div className=' w-full bg-gray-100  border-b-2'>

        <div className=' w-full justify-center flex'>
            <h2 className='text-2xl font-bold text-gray-800'>FriendBook</h2>
        </div>


{(!loggedUser._id)&&   <div className=' w-full  min-h-0 flex flex-wrap justify-center my-5'>
    

    
    <Link to={'/login'}>
    <button className=' my-2 p-2 bg-blue-500 text-white font-semibold rounded-md'>Login</button>
    </Link>

    <Link to={'/signup'}>
    <button className=' my-2 p-2 mx-1 bg-blue-500 text-white font-semibold rounded-md'>Signup</button>
    </Link>

   
 

    </div>}
     

     {loggedUser._id&&<div className=' w-full h-12 flex flex-wrap justify-center my-5'>
    

    
    <Link to={'/'}>
    <button className=' my-2 p-2 bg-blue-500 text-white font-semibold rounded-md'>Home</button>
    </Link>

    <Link to={'/requests'}>
    <button className=' my-2 p-2 mx-1 bg-blue-500 text-white font-semibold rounded-md'>Requests {`(Recevied/ Sended)`}</button>
    </Link>

    <Link to={'/searchusers'}>
    <button className=' my-2 p-2 mx-1 bg-blue-500 text-white font-semibold rounded-md'>Search Friends and Send Request</button>
    </Link>

    <Link to={'/aboutme'}>
    <button className=' my-2 p-2 mx-1 bg-blue-500 text-white font-semibold rounded-md'>Profile</button>
    </Link>

   
    <button onClick={handlerLogout} className=' my-2 p-2 mx-1 bg-blue-500 text-white font-semibold rounded-md'>Logout</button>
 

    </div>}
    
    </div>
  )
}

export default Header