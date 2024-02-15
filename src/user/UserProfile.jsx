import React, { useEffect, useState } from 'react'
import { Client, Account, Databases, Query } from "appwrite";
import { NavLink, useNavigate } from 'react-router-dom';

function UserProfile() {
  const [userData, setUserData] = useState([]);
  const navigate  = useNavigate();
  const client = new Client();
  const account = new Account(client);
  client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6572b1f0d2dacd3909ac') // Your project ID
    ;
  const databases = new Databases(client);
  const userID = localStorage.getItem('userId')
  console.log(typeof userID, userID)
  useEffect(() => {
    async function handleUserDetails() {
      try {
        const response = await databases.listDocuments(
          '6573f9c378124f54aea0',
          '6573fc463d7db6c87417',
          [Query.equal('userID', userID)]
        );
        setUserData(response.documents);
      } catch (error) {
        console.log(error.message);
      }
    }

    // Call the function inside useEffect to ensure it runs after the component has mounted
    handleUserDetails();
  }, []); // Empty dependency array ensures it only runs on mount

  useEffect(() => {
    console.log(userData, "userdata")
  }, [userData])

async function handleLogout(){
  try{
     const response = await account.deleteSessions();
     if(response){
     
       localStorage.removeItem('userId');
       localStorage.removeItem('userName');
       navigate('/');
     }
  }
  catch(error){
    console.log(error.message)
  }
}


  return (
    <>
      <h2 style={{ marginLeft: "30px" }}>My Account</h2>
      <div className='user-profile'>
        <div style={{ display: 'flex', gap: "20px" }}>
          <p style={{
            fontSize: "25px", textTransform: "capitalize", fontWeight: "600", background: "black", color: "#fff", width: "50px", height: "50px", display: "flex", justifyContent: "center",
            alignItems: "center", borderRadius: "50%"
          }}>{userData[0]?.userName.charAt(0)}</p>
          <div>
            <div style={{ fontSize: "20px", textTransform: "capitalize", fontWeight: "600" }}>{userData[0]?.userName}</div>
            <div>{userData[0]?.userEmail}</div>
            <div>+91 {userData[0]?.userNumber}</div>
          </div>
        </div>

        <div>Edit Profile</div>
      </div>
      <div className='user-others'>
        <NavLink to='/admin'> <div style={{background:"#f5f5f5"}}><p style={{ fontWeight: "700" }}>ADMIN DASHBOARD</p><i class="fa fa-chevron-right"></i></div></NavLink>
        <div><p>Order</p><i class="fa fa-chevron-right"></i></div>
        <div><p>Payments</p><i class="fa fa-chevron-right"></i></div>
        <div><p>My Rewards</p><i class="fa fa-chevron-right"></i></div>
        <div><p>Address Book</p><i class="fa fa-chevron-right"></i></div>
        <div><p>Track Your Order</p><i class="fa fa-chevron-right"></i></div>
        <div><p>Customare Care</p><i class="fa fa-chevron-right"></i></div>
        <div><p>How to Return</p><i class="fa fa-chevron-right"></i></div>
        <div><p>Your Favorit</p><i class="fa fa-chevron-right"></i></div>
        <div><p>Join Our Team</p><i class="fa fa-chevron-right"></i></div>
      </div>
      <div onClick={()=> handleLogout()} className='logout'>Logout</div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </>
  )
}

export default UserProfile