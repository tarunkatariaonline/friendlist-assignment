
import { useState } from "react"
import Sendedrequest from "./Sendedrequest"
import Receivedrequest from "./Receivedrequest"
import useRequestUsers from "../../hooks/useRequestsUsers"


const Requests = () => {
  const [requestType,setRequestType] = useState<string>('received')

 
  return (
    <div className='  h-[100vh] bg-gray-100 '>
    <div className='  h-full w-full '>

     
     <div className=" w-full flex py-10">

     <div className=" w-full flex justify-center  px-10 h-12 max-md:px-2   ">

<button className={ `font-bold  w-full  ${requestType==='received'&&'border-b-2'} border-blue-500 `  } onClick={()=>{setRequestType('received')}} >Received Request</button>
</div>

      <div className=" w-full flex justify-center  px-10 h-12 max-md:px-2   ">

<button className= { `font-bold  w-full  ${requestType!=='received'&&'border-b-2'} border-blue-500 `  } onClick={()=>{setRequestType('sended')}} >Sended Request</button>
</div>

      </div>   


  
  {requestType==='received'?<Receivedrequest/>:<Sendedrequest/>}
        
       
          
     

    </div>
  </div>
  )
}

export default Requests