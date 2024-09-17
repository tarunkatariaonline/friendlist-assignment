import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BASE_URL } from '../../utils'
import { UserState } from '../../Redux/Slice/user/userSlice'
import { useAppSelector } from '../../Redux/hooks'
const SuggestedUser = () => {
    
    const loggedUser = useAppSelector((state)=>state.user)
    const [suggestionType,setSuggestionType] = useState('friend')
    const [url,setUrl] = useState(`${BASE_URL}/api/v1/friendbook/suggestusersusingfriends`)
    const [suggestedUsers, setSuggestedUsers] = useState<UserState[]|[]>([])
    

  const   fetchSuggestedFriends = async(url:string)=>{
    setSuggestedUsers([])
    // 
    try{
        const response = await axios.get(url,{
            withCredentials:true
        })
        console.log(response.data.suggestions)
        setSuggestedUsers(response.data.suggestions)

    }catch(err){

    }
    }


    const handlerAddFriend = async(id:string|null)=>{
        try {
          const response = await axios.post(`http://localhost:3000/api/v1/friendbook/sendfriendrequest/${id}`,{
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
    useEffect(()=>{
      fetchSuggestedFriends(url)
    },[url])
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
    <h2 className="text-xl font-semibold mb-4 text-center">Suggested Users</h2>
     
    <div className=" w-full flex py-5">

<div className=" w-full flex justify-center   h-12 max-md:px-2   ">

<button className={ `font-bold  w-full  ${suggestionType==='friend'&&'border-b-2'} border-blue-500 `  } onClick={()=>{setSuggestionType('friend'),
    setUrl(`${BASE_URL}/api/v1/friendbook/suggestusersusingfriends`)
}} >According Friends</button>
</div>

<div className=" w-full flex justify-center   h-12 max-md:px-2   ">

<button className={ `font-bold  w-full  ${suggestionType!=='friend'&&'border-b-2'} border-blue-500 `  } onClick={()=>{setSuggestionType('hobbies')
    setUrl(`${BASE_URL}/api/v1/friendbook/suggestuserusinghobbies`)
}} >According Hobbies</button>
</div>


 </div>   
    <div className="space-y-4">
    

{suggestedUsers.map((user)=>{
return (loggedUser._id!==user._id) &&<div key={user._id} className="flex items-center justify-between border-b pb-4">
       
<img
  src={BASE_URL+user.avatar}
  
  className="rounded-full w-12 h-12 object-cover mr-4"
/>


<div className="flex-grow">
  <p className="font-medium text-gray-900">{user.name}</p>
  <p className="text-gray-600">@{user.username}</p>
</div>

{/* Add Friend Button */}
<button onClick={()=>{
    handlerAddFriend(user._id)
}} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded">
  Add Friend
</button>
</div>
})}
       
      
    </div>
  </div>
  )
}

export default SuggestedUser