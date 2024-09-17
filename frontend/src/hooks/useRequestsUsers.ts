import { useEffect, useState } from "react";
import axios from "axios";
import { setUser, UserState } from "../Redux/Slice/user/userSlice";
import { BASE_URL } from "../utils";
const useRequestUsers = (url:string,updateApi:boolean) => {

    const [users, setUsers] = useState<UserState[]|[]>([]);
    const [error,setError] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false)
    const fetchRequestUsers = async () => {
        setLoading(true)
        setError(false)
        setUsers([])

        try {
            
            const response = await axios.get(url,{
                withCredentials:true
            })

        
        //  setSearchUsers(response.data.users)
         console.log(response.data.requests)
         setUsers(response.data.requests)
        } catch (err) {
           setError(true)
        }

        setLoading(false)

      
    }
    useEffect(() => {
        fetchRequestUsers()
    }, [url,updateApi])

    return {users,loading,error}
}

export default useRequestUsers

