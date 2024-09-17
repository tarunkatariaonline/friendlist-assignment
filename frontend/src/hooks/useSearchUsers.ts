import { useEffect, useState } from "react";
import axios from "axios";
import { UserState } from "../Redux/Slice/user/userSlice";
import { BASE_URL } from "../utils";
const useSearchUsers = (query:string) => {

    const [searchUsers, setSearchUsers] = useState<UserState[]|[]>([]);
    const [error,setError] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false)
    const fetchSearchUsers = async () => {
        setLoading(true)
        setError(false)
        setSearchUsers([])

        try {
            
            const response = await axios.get(`${BASE_URL}/api/v1/friendbook/users/search?query=${query}`)

         console.log("search data")
         setSearchUsers(response.data.users)
        //  console.log(response.data)
        } catch (err) {
           setError(true)
        }

        setLoading(false)

      
    }
    useEffect(() => {
        fetchSearchUsers()
    }, [query])

    return {searchUsers,loading,error}
}

export default useSearchUsers

