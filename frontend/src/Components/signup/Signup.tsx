import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../utils"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Signup = () => {

  const [previewImage,setPreviewImage] = useState<string>('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
  const [image,setImage] = useState<File|null>(null)
  const [name,setName] = useState<string>('')
  const [username,setUsername] = useState<string>('')
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [phoneno,setPhoneno] = useState<string>('')
  const [hobbies,setHobbies] = useState<any>([])
  const navigate = useNavigate()

 interface hobbyInterface{
     id:number,
     name:string
  }
  const dummyHobbies:hobbyInterface[]= [
    { id: 1, name: 'Reading' },
    { id: 2, name: 'Coding' },
    { id: 3, name: 'Gaming' },
    { id: 4, name: 'Cooking' },
    { id: 5, name: 'Painting' },
    { id: 6, name: 'Hiking' },
    { id: 7, name: 'Swimming' },
    { id: 8, name: 'Photography' },
    { id: 9, name: 'Dancing' },
    { id: 10, name: 'Music' },
    { id: 11, name: 'Traveling' },
    { id: 12, name: 'Writing' },
    { id: 13, name: 'Gardening' },
    { id: 14, name: 'Fishing' },
    { id: 15, name: 'Cycling' },
    { id: 16, name: 'Running' },
    { id: 17, name: 'Meditation' },
    { id: 18, name: 'Yoga' },
    { id: 19, name: 'Photography' },
    { id: 20, name: 'Collecting Stamps' }
];





  const handlerImage = (e:any)=>{

    if(e.target.files[0]){
      setImage(null)
    const selectedImage = e.target.files[0];
   
    setPreviewImage(URL.createObjectURL(selectedImage))
       setImage(selectedImage)
    }
  }

  const handlerSubmitInfo = async()=>{
    const formData = new FormData();
    formData.append('image', image as File);
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneno', phoneno);

    formData.append('hobbies', JSON.stringify(hobbies));
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/user/register`, formData);
      console.log(response.data);
      toast.success(response.data.message)
      navigate('/login')
      setEmail('')
      setName('')
      setPassword('')
      setPhoneno('')
      setHobbies([])
    }catch(err:any){
      console.log(err);
      toast.error(err.response.data.message)
    }
   
    
   
  }
  return (
    <div className=" w-full  min-h-0 flex justify-center items-center" >
        <form className=" w-full   flex justify-center" onSubmit={(e)=>{
          e.preventDefault()
          handlerSubmitInfo()
        }} >
    <div className=" w-[40%] max-md:w-[95%]  items-center   h-min p-5 bg-gray-300/50  rounded-md">
      
      <div className=" w-full flex justify-center mt-10">
      <img src={previewImage} className=" rounded-full w-20 h-20 object-cover" alt="" />
      </div>
       
      <p className=" mx-1 my-2">Upload Profile Pic :</p>
      <input type="file" onChange={handlerImage} className=" w-full h-10 border-2 rounded-md outline-none  bg-slate-400/30 border-blue-300 " />
      <p className=" mx-1 my-2">Name :</p>
      <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className=" w-full h-10 border-2 rounded-md outline-none  bg-slate-400/30 border-blue-300" placeholder=" Enter your Name" />
      <p className=" mx-1 my-2">Username :</p>
      <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} className=" w-full h-10 border-2 rounded-md outline-none  bg-slate-400/30 border-blue-300" placeholder=" Choose unique username" />
      <p className=" mx-1 my-2">Email:</p>
     <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}  className=" w-full h-10 border-2 rounded-md outline-none  bg-slate-400/30 border-blue-300" placeholder=" Enter your Email" />

     <p className=" mx-1 my-2">Phone no:</p>
     <input type="number" value={phoneno} onChange={(e)=>{setPhoneno(e.target.value)}}  className=" w-full h-10 border-2 rounded-md outline-none  bg-slate-400/30 border-blue-300" placeholder=" Enter your Phone no" />

     <p className=" mx-1 my-2">Password :</p>
     <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}  className=" w-full h-10 border-2 rounded-md outline-none  bg-slate-400/30 border-blue-300" placeholder=" Enter your Password" />
      <p>Hobbies :</p>
     <div className="w-full flex flex-wrap  min-h-10 border-2 rounded-md outline-none  bg-slate-400/30 border-blue-300">
      
      {hobbies.map((item:any,index:any)=>{
        return <button type="button"  onClick={()=>{
         
          const vl = item
          const newHobbies = hobbies.filter((hb:any)=>hb!==vl)
           setHobbies(newHobbies)
        
        }} className=" px-2 bg-blue-500 text-white my-1 mx-1" key={index}>{item}</button>
      })}
     </div>

    <div>
      <p className=" text-lg border-2  border-b-red-400">Choose hobbies from here :</p>
     <div className=" w-full flex flex-wrap">
      {dummyHobbies.map((hobby)=>{
         return <button type="button" onClick={()=>{
          if(hobbies.includes(hobby.name)){

          }else{
            if(hobbies.length<6){
          setHobbies((prev:any)=>[...prev,hobby.name])
            }
          }
         }} className=" px-2 mx-1 my-1 bg-blue-300" key={hobby.id}>{hobby.name}</button>
      })}
     </div>

     </div>

     <div>

     </div>
        
    <div className=" w-full justify-center my-7 ">
        <button type="submit" className=" w-full bg-gradient-to-r from-cyan-500 to-blue-500  h-10 text-white  rounded-md font-semibold">Login</button>
    </div>
    
    </div>
    </form>
</div>
  )
}

export default Signup