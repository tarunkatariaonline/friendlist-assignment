
import { UserState } from '../../Redux/Slice/user/userSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../utils'

interface SearchUserProps {
  user:UserState
}
const Usercard = ({user}:SearchUserProps) => {
  

  const handlerAddFriend = async()=>{
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/friendbook/sendfriendrequest/${user._id}`,{
      },{
        withCredentials:true
      })
      console.log(response.data)
      toast.success(response.data.message)
      }
    catch(err:any){
       toast.error(err.response.data.message)
    }
   
  }
  return (
    <div className=" w-full  flex justify-center">
    <div  className="flex items-center bg-white p-2 w-[60%]  max-md:w-[95%]  shadow-md justify-between border-b pb-4">
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
    <button onClick={handlerAddFriend} className="bg-blue-500 max-md:font-semibold  hover:bg-blue-300 text-white font-bold py-1 px-4 rounded">
    Add Friend
    </button>
    
  </div>
  </div>
  )
}

export default Usercard