import React, { useEffect, useState } from 'react'

function AdminDashboard() {
    const [userData,setUser]=useState(null)
    useEffect(()=>{
        const getUser= async ()=>{
            try {
                const apiResponse = await fetch("http://localhost:3000/api/auth/get-user",{
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                   
                })
               if(!apiResponse.ok){
                    throw new Error("Unauthorised");
               }
               const responseData= await apiResponse.json();
               setUser (responseData);
                
            } catch (error) {
                console.log("Error fetching user data:",error);
            }
           
        } 
        getUser();
    },[])
    if(!userData||!userData.success) return <div>Loading...</div>
  return (
    // <div>
    //   <h1>User Data</h1>
    //   <p>Name:{userData.user.name}</p>
    //   <p>Email:{userData.user.email}</p>
    //     <p>Phone Number:{userData.user.phoneNumber}</p>
    //     <p>Avatar:{userData.user.avatar}</p>
    // </div>\-
    <div></div>
  )
}

export default AdminDashboard
