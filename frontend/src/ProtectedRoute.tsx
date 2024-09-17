import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import axios from 'axios';
import { BASE_URL } from './utils';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading,setIsLoading] = useState(true)
    const fetchUserDetails = async()=>{
        try{
        const response = await axios.get(`${BASE_URL}/api/v1/user/aboutme`,{
        
            withCredentials:true
        });

        if(response){

        }

     
        
       
       
    
     
      
        }catch(err:any){
            setIsAuthenticated(false)
            console.log(err)
            toast.error("Your are not logged in !")
        }

        setIsLoading(false)
    }
    useEffect(()=>{
    fetchUserDetails()
    },[])


    if(isAuthenticated===false){
        return <Navigate to="/login" />;
    }

    if(isLoading===true){
        return <div>loading.....</div>
    }
  return <>{children}</>; // Render protected content if authenticated
};

export default ProtectedRoute;
