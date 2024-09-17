import { useAppSelector } from "../../Redux/hooks";
import { BASE_URL } from "../../utils";
import SuggestedUser from "./SuggestedUser";

const Aboutme = () => {
   const user = useAppSelector((state) => state.user);

    console.log(user)

  return (
    <div className="flex max-md:block justify-center bg-gray-100 min-h-screen py-8 px-4">
   
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mr-8">
     
        <div className="flex justify-center mb-6">
          <img 
            src={BASE_URL+user.avatar}
           
            className="rounded-full w-32 h-32 "
          />
        </div>

   
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
        </div>

        <div className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <p className="text-gray-900">{user.phoneno}</p>
          </div>

      
          <div className="  ">
           
            <p className="text-gray-900  whitespace-nowrap overflow-hidden  text-ellipsis ">{user?.hobbies.join(',')}</p>
          </div>

       
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
        
         
        </div>
      </div>

           <SuggestedUser/>
      
    </div>
  );
};

export default Aboutme;