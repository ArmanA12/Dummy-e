import React from 'react'
import Dummy from '../assets/dummy.png'
import { useState } from 'react'
import { Client, Account, ID, Databases } from "appwrite";
import { useNavigate, NavLink } from 'react-router-dom';



function Signup() {
    const [showHidePass, setShowHidePass] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const togglePasswordVisibility = () => {
        setShowHidePass(!showHidePass);
    };
    const navigate = useNavigate();
    const client = new Client();
    const account = new Account(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('6572b1f0d2dacd3909ac') // Your project ID
        ;
    var userID;
    const handleSubmit = (e) => {
        e.preventDefault();
        // Continue with account creation request
        account
            .create(ID.unique(), email, password, name)
            .then(function (response) {
                console.log(response.$id)
                navigate('/login')
                userID = response.$id
                addUserDetails();
            })

            .catch(function (error) {
                console.log(error); // Failure
            });
    };

    const databases = new Databases(client);
    const userNumber = number;
    const userName = name;
    const userEmail = email;

    async function addUserDetails() {
        try {
            const response = await databases.createDocument('6573f9c378124f54aea0', '6573fc463d7db6c87417',
                ID.unique(),
                {userID, userEmail, userName, userNumber}
                )
        }
        catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            <div className='signup-container'>
                <div className='signup'>
                    <div><img style={{ width: "170px" }} src={Dummy} alt="" /></div>
                    <div><h2>Create Account</h2></div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input onChange={(e) => setName(e.target.value)} type="text" minLength='3' maxLength='30' placeholder='Enter name' required /><br />
                            <input onChange={(e) => setEmail(e.target.value)} type="email" minLength='3' maxLength='50' placeholder='Enter email' required /><br />
                            <input onChange={(e) => setNumber(e.target.value)} type="number" placeholder='Mobile Number' /> <br />
                            <div style={{ position: "relative" }}>   <input placeholder='At Least 8 Charecters'
                                type={showHidePass ? 'text' : 'password'}
                                value={password}
                                minLength='8'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                                <p onClick={togglePasswordVisibility}>{showHidePass ? <i class="fa fa-eye-slash"></i> : <i class="fa fa-eye"></i>}</p>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <div style={{ paddingTop: "10px", color: "#424242" }}>Already Have Account? <NavLink to='/login'>Login</NavLink> </div>
                </div>
            </div>
        </>
    )
}

export default Signup